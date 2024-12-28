import { PAGE_TITLE_ID } from "@/constants";

/**
 * CustomTOC behavior is a copy from the StarlightTOC of astro.
 */
export class CustomTOC extends HTMLElement {
  private _current = this.querySelector<HTMLAnchorElement>("a[aria-current=true");
  private minH = parseInt(this.dataset.minH || "2", 10);
  private maxH = parseInt(this.dataset.maxH || "3", 10);

  constructor() {
    super();
    this.onIdle(() => this.init());
  }

  protected set current(link: HTMLAnchorElement) {
    if (link === this._current) return;
    if (this._current) this._current.removeAttribute("aria-current");
    link.setAttribute("aria-current", "true");
    this._current = link;
  }

  private onIdle = (cb: IdleRequestCallback) => {
    (window.requestIdleCallback || ((cb) => setTimeout(cb, 1)))(cb);
  };

  private init = (): void => {
    // All the links in the table of contents.
    const links = [...this.querySelectorAll("a")];

    // Test if an element is a table-of-contents heading.
    const isHeading = (el: Element): el is HTMLHeadingElement => {
      if (el instanceof HTMLHeadingElement) {
        // Skip the page title.
        if (el.id === PAGE_TITLE_ID) return true;

        // Check the heading level is within he user-configured
        // limits for the TOCs.
        const level = el.tagName[1];
        if (level) {
          const int = parseInt(level, 10);
          if (int >= this.minH && int <= this.maxH) return true;
        }
      }
      return false;
    };

    // Walk up the DOM to find the nearest heading.
    const getElementHeading = (el: Element | null): HTMLHeadingElement | null => {
      if (!el) return null;

      if (isHeading(el)) return el;

      let sibling = el.previousElementSibling;
      while (sibling) {
        if (isHeading(sibling)) return sibling;
        sibling = sibling.previousElementSibling;
      }

      // Walk back up the parent.
      return getElementHeading(el.parentElement);
    };

    // Handle intersection and set the current link to the heading for the current intersection
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting) continue;
        const heading = getElementHeading(target);
        if (!heading) continue;
        const link = links.find(
          (link) => link.hash === "#" + encodeURIComponent(heading.id)
        );
        if (link) {
          this.current = link;
          break;
        }
      }
    };

    // Observe elements with an `id` (most likely headings) and their siblings.
    // Also observe direct children of `.content` to include elements before
    // the first heading.
    const toObserve = document.querySelectorAll(
      "main [id], main [id] ~ *, main .content > *"
    );

    let observer: IntersectionObserver | undefined;
    const observe = () => {
      if (observer) return;
      observer = new IntersectionObserver(setCurrent, {
        rootMargin: this.getRootMargin(),
      });
      toObserve.forEach((h) => observer!.observe(h));
    };
    observe();

    let timeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      // Disable intersection observer while window is resizing
      if (observer) {
        observer.disconnect();
        observer = undefined;
      }
      clearTimeout(timeout);
      timeout = setTimeout(() => this.onIdle(observe), 200);
    });
  };

  private getRootMargin(): `-${number}px 0% ${number}px` {
    const navBarHeight =
      document.getElementById("header")?.getBoundingClientRect().height || 0;

    const top = navBarHeight;
    const bottom = top + 53;

    const height = document.documentElement.clientHeight;
    return `-${top}px 0% ${bottom - height}px`;
  }
}

customElements.define("custom-toc", CustomTOC);
