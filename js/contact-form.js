import { BASE_API } from "./fetch-request-data.js";
import { contactForm } from "./selectors.js";

class ContactFormHandler {
  constructor() {
    this.publishUuid = this.getPublishUuidFromUrl();
    this.endpoint = `${BASE_API}/${this.publishUuid}`;
    this.init();
  }

  getPublishUuidFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const publishUuid = urlParams.get("publish_uuid");

    if (!publishUuid) {
      console.warn("No publish_uuid found in URL parameters");
    }

    return publishUuid;
  }

  init() {
    if (contactForm) {
      this.bindEvents();
      this.setupFormValidation();
    }
  }

  bindEvents() {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  setupFormValidation() {
    // Add real-time validation for each input
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remove existing error styling
    this.clearFieldError(field);

    // Validate based on field type
    switch (field.type) {
      case "text":
        if (!value) {
          isValid = false;
          errorMessage = "This field is required";
        }
        break;
      case "tel":
        if (!value) {
          isValid = false;
          errorMessage = "This field is required";
        }
        break;
      default: // textarea
        if (!value) {
          isValid = false;
          errorMessage = "Message is required";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.showFieldSuccess(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("error");

    // Create or update error message
    let errorElement = field.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      field.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  showFieldSuccess(field) {
    field.classList.remove("error");
    field.classList.add("success");

    // Remove error message
    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.classList.remove("show");
    }
  }

  clearFieldError(field) {
    field.classList.remove("error");
    field.classList.remove("success");

    const errorElement = field.parentNode.querySelector(".error-message");
    if (errorElement) {
      errorElement.classList.remove("show");
    }
  }

  async handleSubmit() {
    try {
      // Check reCAPTCHA first
      // if (!this.validateRecaptcha()) {
      //   this.showError("Please complete the reCAPTCHA verification.");
      //   return;
      // }

      // Get form data
      const formData = this.getFormData();

      // Validate all fields
      if (!this.validateAllFields()) {
        return;
      }

      // Show loading state
      this.showLoading();

      // Send data to endpoint
      const response = await this.sendFormData(formData);

      // Handle response
      this.handleResponse(response);
    } catch (error) {
      console.error("Error submitting form:", error);
      this.showError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      this.hideLoading();
    }
  }

  // validateRecaptcha() {
  //   const recaptchaResponse = grecaptcha.getResponse();
  //   if (!recaptchaResponse) {
  //     return false;
  //   }
  //   return true;
  // }

  validateAllFields() {
    const inputs = contactForm.querySelectorAll("input, textarea");
    let allValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        allValid = false;
      }
    });

    return allValid;
  }

  getFormData() {
    const formData = {
      full_name:
        contactForm.querySelector('input[name="full_name"]')?.value || "",
      mobile: contactForm.querySelector('input[name="mobile"]')?.value || "",
      description:
        contactForm.querySelector('textarea[name="description"]')?.value || "",
    };
    return formData;
  }

  validateForm(formData) {
    // Basic validation
    if (!formData.name.trim()) {
      this.showError("Please enter your name");
      return false;
    }

    if (!formData.mobile.trim()) {
      this.showError("Please enter your phone number");
      return false;
    }

    if (!formData.description.trim()) {
      this.showError("Please enter your message");
      return false;
    }

    return true;
  }

  async sendFormData(formData) {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error(
          "Network error: Please check your internet connection and try again."
        );
      }
      throw error;
    }
  }

  handleResponse(response) {
    if (response.status === true) {
      this.showSuccess("Thank you! Your message has been sent successfully.");
      this.resetForm();
    } else {
      this.showError(
        response.message || "Something went wrong. Please try again."
      );
    }
  }

  showLoading() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML =
        '<span class="circle"></span><span class="text">Sending...</span>';
    }
  }

  hideLoading() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML =
        '<span class="circle"></span><span class="text">Send</span>';
    }
  }

  showSuccess(message) {
    this.showNotification(message, "success");
  }

  showError(message) {
    this.showNotification(message, "error");
  }

  showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector(".form-notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `form-notification ${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ${
              type === "success"
                ? "background-color: #28a745;"
                : "background-color: #dc3545;"
            }
        `;

    // Add to page
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }

  resetForm() {
    contactForm.reset();

    // Reset reCAPTCHA
    // if (typeof grecaptcha !== "undefined") {
    //   grecaptcha.reset();
    // }

    // Clear all validation states
    const inputs = contactForm.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      this.clearFieldError(input);
    });
  }
}

// Initialize contact form handler when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ContactFormHandler();
});

export default ContactFormHandler;
