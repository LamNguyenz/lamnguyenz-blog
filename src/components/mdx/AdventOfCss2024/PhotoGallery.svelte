<script>
  import { fade } from "svelte/transition";

  const photoList = [
    "/blog/advent-of-css-2024/day-1/photo1.jpg",
    "/blog/advent-of-css-2024/day-1/photo2.jpg",
    "/blog/advent-of-css-2024/day-1/photo3.jpg",
    "/blog/advent-of-css-2024/day-1/photo4.jpg",
    "/blog/advent-of-css-2024/day-1/photo5.jpg",
    "/blog/advent-of-css-2024/day-1/photo6.jpg",
  ];
  let count = $state(1);
  const photos = $derived(photoList.slice(0, count));

  const addPhoto = () => {
    count > 5 && photoList.push(photoList.at(-1));
    count++;
  };
  const removePhoto = () => {
    count = Math.max(1, count - 1);
  };
</script>

<div class="not-prose">
  <div class="container">
    {#each photos as photo}
      {#key photo}
        <div transition:fade={{ duration: 300 }} class="image">
          <img
            loading="eager"
            decoding="async"
            src={photo}
            alt={`${photo.split("/").pop()}`}
          />
        </div>
      {/key}
    {/each}
  </div>
  <div class="flex gap-2 mt-2">
    <button class="btn" onclick={addPhoto}>Add more</button>
    <button class="btn" onclick={removePhoto}>Remove</button>
  </div>
</div>

<style>
  .container {
    aspect-ratio: 16/9;
    display: grid;
    background-color: #f0f0f0;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
  }

  .image {
    min-height: 0;
    position: relative;
    border-radius: 0.5rem;
    overflow: hidden;
    counter-increment: image-counter;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container:has(.image:nth-child(2)) {
    grid-template-columns: repeat(2, 1fr);
  }

  .container:has(.image:nth-child(3)) {
    grid-template-columns: repeat(2, 1fr);
    .image:nth-child(3) {
      grid-column: span 2;
    }
  }

  .container:has(.image:nth-child(4)) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .image:nth-child(3) {
      grid-column: span 1;
    }
  }

  .container:has(.image:nth-child(5)) {
    grid-template-columns: repeat(6, 1fr);
    .image:nth-child(1),
    .image:nth-child(2) {
      grid-column: span 3;
    }
    .image:nth-child(3),
    .image:nth-child(4),
    .image:nth-child(5) {
      grid-column: span 2;
    }
  }

  /* More than 5 photos */
  .container:has(.image:nth-child(6)) {
    counter-set: image-counter -5;
    counter-reset: image-counter;
    
    .image:nth-child(5) {
      grid-column-start: 5;
      grid-column-end: span 2;
      grid-row-start: 2;
    }

    .image:nth-child(n + 6) {
      grid-column-start: 5;
      grid-column-end: span 2;
      grid-row-start: 2;
      img {
        display: none;
      }
    }

    .image:last-of-type::after {
      content: "+" counter(image-counter);
      position: absolute;
      inset: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      font-size: 2rem;
      font-weight: bold;
    }
  }
</style>
