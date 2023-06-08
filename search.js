const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".search-icon");
const modal = document.querySelector(".modal hidden");
const closeModel = document.querySelector(".btn--close-modal");
const resultsCointainer = document.querySelector(".results");
const state = document.querySelector(".state");

// fetching data from the given api(online)

const getData = fetch("https://tinyurl.com/5bzzvh6u")
  .then((response) => response.json())
  .then((citiesData) => {
    searchIcon.addEventListener("click", () => {
      console.log("clicked");
      const query = searchInput.value.toLowerCase();
      const filteredData = citiesData.filter((city) => {
        const cityName = city.city.toLowerCase();

        const stateName = city.state.toLowerCase();

        return cityName.includes(query) || stateName.includes(query);
      });
      console.log(filteredData);
      displayResults(filteredData);
    });

    function displayResults(data) {
      // Clear Previous Results
      resultsCointainer.innerHTML = "";
      // Display total number of cities found
      const totalCount = document.createElement("p");
      totalCount.textContent = `Total cities found: ${data.length}`;
      resultsCointainer.appendChild(totalCount);
      // display city details
      data.forEach((city) => {
        //console.log(city);
        const cityDetails = document.createElement("div");
        /*city.growth_2000_to_2013 > 0
          ? (cityDetails.style.color = blue)
          : (cityDetails.style.color = "");*/

        cityDetails.innerHTML = `
        <p class='city-state'>✨City:${city.city}</p>
        <p class= 'city-state'>🧧State:${city.state}</p>
        <p class="city-state">👫population:${city.population}</p>
        <p class = 'city-state'>♐growth:${city.growth_from_2000_to_2013}</p>
        
        `;
        resultsCointainer.appendChild(cityDetails);
        // selecting all elements
        const cityName = document.querySelectorAll(".city-state");

        cityName.forEach((btn) =>
          btn.addEventListener(
            "click",
            () => {
              console.log("clicked");
              const moreCityDetails = `<p>${city.population}</p>
              <p>${city.latitude}</p>
              <p>${city.longitude}</p>
             
              `;
              modal.appendChild(moreCityDetails);
            }

            //console.log(data.city.population);
          )
        );
      });
    }
    const closeModal = function () {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    };
  });
