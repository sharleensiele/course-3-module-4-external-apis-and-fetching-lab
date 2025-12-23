// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("#state-input")
  const button = document.querySelector("#fetch-alerts")
  const displayDiv = document.querySelector("#alerts-display")
  const errorDiv = document.querySelector("#error-message")

  button.addEventListener("click", () => {
    const state = input.value

    fetch(`${weatherApi}${state}`)
      .then(response => response.json())
      .then(data => {
        // Clear previous alerts
        displayDiv.innerHTML = ""

        // Display title + alert count
        displayDiv.textContent = `${data.title}: ${data.features.length}`

        // Display alert headlines
        data.features.forEach(alert => {
          const p = document.createElement("p")
          p.textContent = alert.properties.headline
          displayDiv.appendChild(p)
        })

        // Clear input field
        input.value = ""

        // Clear and hide error
        errorDiv.textContent = ""
        errorDiv.classList.add("hidden")
      })
      .catch(error => {
        errorDiv.textContent = error.message
        errorDiv.classList.remove("hidden")
      })
  })
})
