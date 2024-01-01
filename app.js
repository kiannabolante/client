// Private token for OpenAI API. Please insert your own token to use!
const OPENAI_API_KEY = "REDACTED";

// DOM elements
const userInput = document.querySelector("input"); // Input element for user prompt
const submitIcon = document.querySelector("#submit-icon"); // Submit icon button
const imageSection = document.querySelector(".images-section"); // Section to display generated images

// Function to erase previous pictures
const erasePreviousPictures = () => {
  // Clear the content of the image section
  imageSection.innerHTML = "";
};

// Function to fetch and display images from OpenAI API
const fetchAndDisplayImages = async () => {
  // Erase previous pictures before fetching and displaying new ones
  erasePreviousPictures();

  // Request options for the API call
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: userInput.value,
      n: 2,
      size: "1024x1024",
    }),
  };

  try {
    // Make a POST request to OpenAI API for image generation
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      requestOptions
    );

    // Parse the response as JSON
    const responseData = await response.json();

    // Check if data is available and iterate through each image object
    responseData?.data.forEach((imageObject) => {
      // Create a container for each image
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      // Create an image element and set its source attribute
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", imageObject.url);

      // Append the image element to the container
      imageContainer.append(imageElement);

      // Append the container to the image section in the DOM
      imageSection.append(imageContainer);
    });
  } catch (error) {
    // Handle errors by logging them to the console
    console.error(error);
  }
};

// Attach the fetchAndDisplayImages function to the click event of the submit icon
submitIcon.addEventListener("click", fetchAndDisplayImages);
