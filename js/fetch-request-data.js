const BASE_API =
  "https://testing.8xcrm.com/api/v2/real-estate-inventory/landing-page";

import { buildListItemsHtml, initMap, updateContent } from "./helpers.js";
import {
  accordien,
  addressArea,
  addressCity,
  addressCountry,
  addressFloorNumber,
  addressRegion,
  addressUnitNumber,
  amenitiesList,
  basementArea,
  bathroomCount,
  bedroomCount,
  builtUpArea,
  carouselnner,
  copyrightYear,
  deliveryDate,
  description,
  detailsImgs,
  devDescText,
  devInfo,
  devLogo,
  devLogoImg,
  downPayment,
  email,
  facilitiesList,
  finishingStatus,
  finishingStatusProject,
  finishingType,
  floorCount,
  gardenArea,
  html5VideoContainer,
  installmentsNo,
  logoDeveloper,
  offeringType,
  paymentMethod,
  phoneNumber,
  plotArea,
  pricePerMeter,
  projectCarousel,
  projectName,
  propertyType,
  proPrice,
  purpose,
  roofArea,
  tags,
  unitLocation,
  unitTitle,
  view,
  virtualVideoWrap,
} from "./selectors.js";
import {
  buildSkeletonCarouselItems,
  buildSkeletonDetailsImgs,
} from "./skeltones.js";

function getUrlParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function fetchData() {
  let unit = undefined;
  carouselnner[0].innerHTML = buildCuroserHtml(unit);
  detailsImgs.innerHTML = buildDetailsImgsHtml(unit);

  try {
    const publishUuid = getUrlParam("publish_uuid");
    if (!publishUuid) return;
    const fullUrl = `${BASE_API}/${publishUuid}`;
    const response = await fetch(fullUrl, {
      method: "POST",
    });
    const data = await response.json();
    unit = data.data.unit;
    pulishTime(data.data.publish_time);
    setConentUnit(unit);
    setContentProject(unit.project);
    initMap(unit);
    developerInfo(unit.project);

    if (unit.project.meta_title) {
      const metaTitle = document.createElement("meta");
      metaTitle.setAttribute("name", "title");
      document.head.appendChild(metaTitle);
      metaTitle.setAttribute("content", unit.project.meta_title);
    }

    if (unit.project.meta_description) {
      const metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
      metaDescription.setAttribute("content", unit.project.meta_description);
    }

    const script = document.createElement("script");
    script.src = "js/slider.js";
    script.async = true;
    document.body.appendChild(script);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();

// data html
function buildCuroserHtml(unit) {
  let carouselItems = "";
  if (!unit) return buildSkeletonCarouselItems(4);
  if (unit.media && unit.media.length > 0) {
    unit.media.forEach((media, index) => {
      carouselItems += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <img src="${media.file}" alt="${unit.title}">
        <div class="carousel-caption">
          <h5>${unit.title}</h5>
          <p>${unit.description}</p>
        </div>
      </div>
      `;
    });
  }
  return carouselItems;
}

function buildHtmlVirtualVideo(unit) {
  return `
  <iframe src="${unit.virtual_tour_360}"
    frameborder="0"
    scrolling="no"
    allowfullscreen>
   </iframe>
  `;
}

function buildDetailsImgsHtml(unit) {
  let detailsImgsHtml = "";
  if (!unit) return buildSkeletonDetailsImgs(4);
  if (unit.media && unit.media.length > 0) {
    unit.media.forEach((media, index) => {
      detailsImgsHtml += `
      <img src="${media.file}" alt="${unit.title}">
      `;
    });
  }
  return detailsImgsHtml;
}

function location(unit) {
  return `${unit?.city} , ${unit?.region} , ${unit?.country}`;
}

function price(unit) {
  return `${unit?.price} , ${unit?.currency_code}`;
}

function buildHtmlVideo(unit) {
  if (!unit?.video_embed_url) return "";

  // Convert YouTube watch URL to embed URL
  const embedUrl = unit.video_embed_url
    .replace("watch?v=", "embed/")
    .replace("youtu.be/", "youtube.com/embed/");
  return `
    <iframe
      src="${embedUrl}"
      frameborder="0"
      scrolling="no"
      allowfullscreen>
    </iframe>
  `;
}

function buildProjectTagsHtml(project) {
  return project.tag.map((tag) => `<span>${tag}</span>`).join("");
}

function chips(unit) {
  updateContent(unit.purpose, purpose);
  updateContent(unit.offering_type, offeringType);
}

function unitSectionDetails(unit) {
  updateContent(unit.purpose_type, propertyType);
  updateContent(
    unit.bedroom,
    bedroomCount,
    bedroomCount.parentElement.parentElement
  );
  updateContent(
    unit.bathroom,
    bathroomCount,
    bathroomCount.parentElement.parentElement
  );
  updateContent(
    unit.floor_number,
    floorCount,
    floorCount.parentElement.parentElement
  );
}

function faciltiesAndAmenities(item, index = 0, itemKey = null) {
  updateContent(
    buildListItemsHtml(item.facilities, itemKey ? itemKey[0] : null),
    facilitiesList[index],
    null,
    "block"
  );
  updateContent(
    buildListItemsHtml(item.amenities, itemKey ? itemKey[1] : null),
    amenitiesList[index],
    null,
    "block"
  );
}

function addressUnitSection(unit) {
  updateContent(
    unit.city,
    addressCity,
    addressCity.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.country,
    addressCountry,
    addressCountry.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.region,
    addressRegion,
    addressRegion.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.area_place,
    addressArea,
    addressArea.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.floor_number,
    addressFloorNumber,
    addressFloorNumber.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.unit_number,
    addressUnitNumber,
    addressUnitNumber.parentElement.parentElement,
    "block"
  );
}

function additionalSectionDetails(unit) {
  updateContent(
    unit.full_price_per_meter,
    pricePerMeter,
    pricePerMeter.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.payment_method,
    paymentMethod,
    paymentMethod.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.down_payment_string,
    downPayment,
    downPayment.parentElement.parentElement,
    "block"
  );
  updateContent(
    String(unit.number_of_installments),
    installmentsNo,
    installmentsNo.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.finishing_type,
    finishingType,
    finishingType.parentElement.parentElement,
    "block"
  );
  updateContent(
    unit.furnishing_status,
    finishingStatus,
    finishingStatus.parentElement.parentElement,
    "block"
  );
  updateContent(unit.view, view, view.parentElement.parentElement, "block");
  updateContent(
    String(unit.garden_area) + " " + unit.garden_area_unit,
    gardenArea,
    gardenArea.parentElement.parentElement,
    "block"
  );
  updateContent(
    String(unit.plot_area),
    plotArea,
    plotArea.parentElement.parentElement,
    "block"
  );
  updateContent(
    String(unit.build_up_area) + " " + unit.basement_area_unit,
    builtUpArea,
    builtUpArea.parentElement.parentElement,
    "block"
  );
  updateContent(
    String(unit.roof_area) + " " + unit.roof_area_unit,
    roofArea,
    roofArea.parentElement.parentElement,
    "block"
  );
  updateContent(
    String(unit.basement_area) + " " + unit.basement_area_unit,
    basementArea,
    basementArea.parentElement.parentElement,
    "block"
  );
}

function someUnitDetails(unit) {
  updateContent(unit.description, description, null, "block");
  updateContent(buildHtmlVirtualVideo(unit), virtualVideoWrap, null, "block");
  updateContent(buildHtmlVideo(unit), html5VideoContainer, null, "block");
}

function setConentUnit(unit) {
  carouselnner[0].innerHTML = buildCuroserHtml(unit);
  faciltiesAndAmenities(unit, 0, ["facility", "amenity"]);
  document.title = unit.title;
  unitTitle.textContent = unit.title;
  unitLocation.textContent = location(unit);
  detailsImgs.innerHTML = buildDetailsImgsHtml(unit);
  proPrice.textContent = price(unit);
  chips(unit);
  addressUnitSection(unit);
  additionalSectionDetails(unit);
  unitSectionDetails(unit);
  someUnitDetails(unit);
}

function buildMasterPlanHtml(project) {
  if (!project.master_plans || !project.master_plans.length) return "";

  return `
    <h5 class="subtitle">
      master Plans
    </h5>
    <div class="accordion" id="master-plan-accordion">
      ${project.master_plans
        .map(
          (plan, index) => `
        <div class="card">
          <div class="card-header">
            <h6 class="switch" data-toggle="collapse" data-target="#master-${
              index + 1
            }" aria-expanded="false">
              <i class="far fa-caret-square-down"></i>
              master plan ${index + 1}
            </h6>
          </div>
          <div id="master-${index + 1}" class="collapse panel-collapse">
            <div class="card-body">
              ${
                plan.file
                  ? `
                <div class="plan-img">
                  <a href="${plan.file}" data-lightbox="master-plan-${
                      index + 1
                    }" data-title="${plan.name}">
                    <img class="img-fluid" src="${plan.file}" alt="${
                      plan.name
                    }">
                  </a>
                </div>
              `
                  : "<p>No image available</p>"
              }
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function buildPhasesHtml(project) {
  if (!project.phases || !project.phases.length) return "";

  return `
    <h5 class="subtitle">phases</h5>
    <div class="accordion" id="phases">
      ${project.phases
        .map(
          (phase, index) => `
        <div class="card">
          <div class="card-header">
            <h6
              class="switch"
              data-toggle="collapse"
              data-target="#phase-${index + 1}"
              aria-expanded="false"
            >
              <i class="far fa-caret-square-down"></i>
              ${phase.name}
            </h6>
          </div>
          <div id="phase-${index + 1}" class="collapse panel-collapse">
            <div class="card-body phase-body">
              ${
                phase.media && phase.media.length > 0
                  ? `
                <div class="phase-img mb-3">
                  <img src="${phase.media[0].file}" alt="${phase.name}" />
                </div>
              `
                  : ""
              }
              <div class="phase-title text-center mb-4">
                <h4 class="text-uppercase">${phase.name}</h4>
                <span>Delivery Date: ${phase.delivery_date}</span>
              </div>
              <div class="phase-desc">
                <p class="text-justify">
                  ${phase.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function buildProjectCarouselHtml(project) {
  if (!project.media || !project.media.length) return "";

  const carouselItems = project.media
    .map(
      (media, index) => `
    <div class="carousel-item ${index === 0 ? "active" : ""}">
      <img src="${media.file}" alt="${media.name}" />
    </div>
  `
    )
    .join("");

  const carouselIndicators = project.media
    .map(
      (media, index) => `
    <li
      data-target="#carousel-thumb"
      data-slide-to="${index}"
      class="${index === 0 ? "active" : ""}"
    >
      <img src="${media.file}" class="img-fluid" alt="${media.name}" />
    </li>
  `
    )
    .join("");

  return `
    <div
      id="carousel-thumb"
      class="carousel mb-5 slide carousel-fade project-carousel"
      data-ride="carousel"
    >
      <div class="carousel-inner" role="listbox">
        ${carouselItems}
      </div>
      <ol class="carousel-indicators">
        ${carouselIndicators}
      </ol>
    </div>
  `;
}

function setContentProject(project) {
  updateContent(`Project Name: ${project.value}`, projectName, null, "block");
  updateContent(
    project.finished_status,
    finishingStatusProject,
    null,
    "inline-block"
  );
  updateContent(
    `delivery date: ${project.delivery_date}`,
    deliveryDate,
    null,
    "block"
  );
  updateContent(buildProjectTagsHtml(project), tags, tags, "block");
  faciltiesAndAmenities(project, 1);
  projectLogo(project);
  updateContent(
    buildProjectCarouselHtml(project),
    projectCarousel,
    projectCarousel,
    "block"
  );
  updateContent(
    buildMasterPlanHtml(project),
    accordien[0],
    accordien[0],
    "block"
  );
  updateContent(buildPhasesHtml(project), accordien[1], accordien[1], "block");
}

function developerInfo(project) {
  const hasDeveloperLogo = project?.developer?.logo;
  const hasDeveloperDescription = project?.developer?.description;
  const shouldShowDeveloperInfo = hasDeveloperLogo || hasDeveloperDescription;

  logoDeveloper.style.display = hasDeveloperLogo ? "block" : "none";
  if (hasDeveloperLogo) {
    logoDeveloper.src = project.developer.logo;
  }

  updateContent(project.description, devDescText, null, "block");
  devInfo.style.display = shouldShowDeveloperInfo ? "block" : "none";
}

function projectLogo(project) {
  devLogo.style.display = project?.logo ? "block" : "none";
  if (project?.logo) devLogoImg.src = project.logo;
}

function pulishTime(pulishTime) {
  const year = new Date().getFullYear();

  // Update phone numbers with href
  phoneNumber.forEach((phone, index) => {
    updateContent(pulishTime.mobile_number, phone, null, "flex");
    phone.href = `tel:${pulishTime.mobile_number}`;

    // Update parent anchor tag for first phone element
    if (index === 0) {
      const parentAnchor = phone.closest("a");
      if (parentAnchor) {
        parentAnchor.href = `tel:${pulishTime.mobile_number}`;
      }
    }
  });

  // Update emails with href
  email.forEach((emailLink, index) => {
    updateContent(pulishTime.email, emailLink, null, "flex");
    emailLink.href = `mailto:${pulishTime.email}`;

    // Update parent anchor tag for first email element
    if (index === 0) {
      const parentAnchor = emailLink.closest("a");
      if (parentAnchor) {
        parentAnchor.href = `mailto:${pulishTime.email}`;
      }
    }
  });

  updateContent(year.toString(), copyrightYear, null, "flex");
}
