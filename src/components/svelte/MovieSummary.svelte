<script>
  import Modal from "./Modal.svelte";

  let { movieId, movie, imageUrl } = $props();
  let showModal = $state(false);

  function goToDetails() {
    window.location.href = `/movies/${movieId}/`;
  }

  const formattedDate = $derived(
    new Date(movie.pubDate).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
</script>

<button class="movie-card" onclick={() => (showModal = true)}>
  {#if imageUrl}
    <div class="image-container">
      <img width={720} height={360} src={imageUrl} alt={movie.title} />
    </div>
  {/if}
  <h4 class="title">{movie.title}</h4>
  <p class="date">{formattedDate}</p>
</button>

<Modal bind:showModal>
  {#snippet header()}
    <h2>{movie.title}</h2>
    <p class="modal-date">{formattedDate}</p>
  {/snippet}

  {#snippet children()}
    <div class="modal-body">
      {#if imageUrl}
        <img src={imageUrl} alt={movie.title} class="modal-image" />
      {/if}
      <p class="modal-description">{movie.summary || movie.description}</p>
    </div>
  {/snippet}

  {#snippet footer()}
    <div class="modal-footer">
      <button onclick={goToDetails} class="details-btn"> View Details </button>
    </div>
  {/snippet}
</Modal>

<style>
  .movie-card {
    display: block;
    text-decoration: none;
    transition: 0.3s ease;
    cursor: pointer;
    text-align: left;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
  }

  .image-container {
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 0.5rem;
  }

  .movie-card img {
    width: 100%;
    border-radius: 12px;
    transition: transform 0.4s ease;
  }

  .movie-card .title {
    margin: 0;
    color: rgb(var(--black));
    line-height: 1;
    transition: color 0.3s ease;
  }

  .movie-card .date {
    margin: 0;
    color: rgb(var(--gray));
    transition: color 0.3s ease;
  }

  .movie-card:hover .title,
  .movie-card:hover .date {
    color: #8b5cf6;
  }

  .movie-card:hover img {
    transform: scale(1.05);
    box-shadow: var(--box-shadow);
  }

  .modal-date {
    margin: 0;
    color: rgb(var(--gray));
    font-size: 0.9em;
    text-align: right;
  }

  .modal-body {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    margin: 1em 0;
    text-align: left;
  }

  .modal-image {
    flex-shrink: 0;
    width: 120px;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .modal-description {
    flex-grow: 1;
    line-height: 1.6;
    color: rgb(var(--black));
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1em;
  }

  .details-btn {
    padding: 0.6em 1.2em;
    border-radius: 6px;
    font-weight: 500;
    background-color: #4f46e5;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .details-btn:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  }

  .details-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    .modal-body {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .modal-image {
      margin-bottom: 15px;
    }
  }
</style>
