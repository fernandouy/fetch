document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", async (event) => {
    // Prevengo que se refresque la pagina
    event.preventDefault();

    // Declaro variables a partir del indice del array target
    const [name, lastname, date] = event.target;

    // Asigno un objeto con los datos ingresados en los campos del formulario
    const formData = {
      name: name.value,
      lastname: lastname.value,
      date: date.value,
    };

    try {
      // Hago el llamado a la API pasandole un método POST y como tipo de contenido le digo que va a ser un JSON
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Convierto el objeto formData en un JSON
        }
      );
      if (!response.ok) {
        throw new Error("Error en la llamada a la API");
      }
      const jsonData = await response.json(); // Convierto la respuesta a JSON
      console.log(jsonData); // Muestro por consola la respuesta
    } catch (error) {
      // Si ocurre un error en la llamada a la API automáticamente cae en el catch y muestro el error
      console.error(error);
    }
  });
});
