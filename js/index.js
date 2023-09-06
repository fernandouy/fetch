const container = document.getElementById("container");
let userData;

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

    // Esperamos a que se cree el usuario y lo asignamos a la variable global userData
    userData = await createNewUser(formData);

    // Mostramos el usuario creado
    showUser(userData);
  });
});

async function createNewUser(user) {
  try {
    // Hago el llamado a la API pasandole un método POST y como tipo de contenido le digo que va a ser un JSON
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Convierto el objeto formData en un JSON
    });
    if (!response.ok) {
      throw new Error("Error en la llamada a la API");
    }
    const data = await response.json(); // Convierto la respuesta a JSON
    return data;
  } catch (error) {
    // Si ocurre un error en la llamada a la API automáticamente cae en el catch y muestro el error
    console.error(error);
  }
}

// Función utilizada para mostrar la fecha pasada por parámetro en formato día/mes/año
function formatDate(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}

// Definimos la función que crea una tarjeta con los datos del usuario que le pasamos por parámetro
function showUser(user) {
  container.innerHTML = `
      <div class="card">
        <h5 class="card-header">Usuario</h5>
        <div class="card-body">
          <p class="card-text"><strong>ID: </strong>${user.id}</p>
          <p class="card-text"><strong>Nombre: </strong>${user.name}</p>
          <p class="card-text"><strong>Apellido: </strong>${user.lastname}</p>
          <p class="card-text"><strong>Fecha: </strong>${formatDate(
            user.date
          )}</p>
        </div>
      </div>
    `;
}
