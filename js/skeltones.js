// skeltones
export function buildSkeletonDetailsImgs(length = 3) {
  let skeletonItems = "";

  for (let i = 0; i < length; i++) {
    skeletonItems += `
    <div class="skeleton-loader" style="height: 300px; background: #e0e0e0; margin-bottom: 15px;"></div>
    `;
  }

  return skeletonItems;
}

export function buildSkeletonCarouselItems(length = 2) {
  let skeletonItems = "";

  for (let i = 0; i < length; i++) {
    skeletonItems += `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <div class="skeleton-loader" style="height: 400px; background: #e0e0e0;"></div>
      <div class="carousel-caption">
        <div class="skeleton-loader" style="height: 24px; width: 60%; margin: 0 auto; background: #e0e0e0;"></div>
      </div>
    </div>
    `;
  }

  return skeletonItems;
}
