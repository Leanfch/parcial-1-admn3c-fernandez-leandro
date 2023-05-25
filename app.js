Vue.component("primer-titulo", {
  data: function () {
    return {
      titulo: "Bienvenido/a",
      nombre: "",
      nombreValido: true,
    };
  },
  created() {
    // Cargar el nombre de localStorage si está disponible
    const storedName = localStorage.getItem("nombre");
    if (storedName) {
      this.nombre = storedName;
    }
  },
  methods: {
    // Verificar si el nombre no quede vacío y luego guardarlo en LocalStorage
    guardarNombre() {
      if (this.nombre.trim() === "") {
        this.nombreValido = false;
      } else {
        this.nombreValido = true;
        localStorage.setItem("nombre", this.nombre);
      }
    },
  },

  template:  //HTML
  `
  <div class="divTitle">
  <h1 class="welcomeTitle">{{ titulo }}</h1>
  <input class="nameTitle" type="text" placeholder="Escriba su nombre" v-model="nombre" @input="guardarNombre" />
  <p class="error-message" v-if="!nombreValido">El nombre no puede quedar vacío, por favor ingrese un nombre válido.</p>
</div>
  `,
});

Vue.component("form-datos", {
  data: function () {
    return {
      nuevaTarea: "",
      tareas: [],
      esImportante: false,
    };
  },
  created() {
    // Cargar las tareas del localStorage si están disponibles
    const storedTareas = localStorage.getItem("tareas");
    if (storedTareas) {
      this.tareas = JSON.parse(storedTareas);
    }
  },
  
  template://HTMl
  `
  <div>
  <form @submit.prevent>
    <div class="divInputButton">
      <input class="inputTarea" type="text" placeholder="Agregue una nueva tarea" v-model="nuevaTarea"
        @keyup.enter="agregarTarea" />
      <button class="btnAgregar" @click.prevent="agregarTarea"><img  src="assets/task.svg"/></button>
    </div>
    <label class="tareaLabel">Tarea importante</label>
    <div class="divCheckbox">
      <div class="checkbox-wrapper-22">
        <label class="switch" for="checkbox">
          <input v-model="esImportante" type="checkbox" id="checkbox" />
          <div class="slider round"></div>
        </label>
      </div>
    </div>
  </form>
  <h2 class="titleLista">Lista de tareas</h2>
  <ul>
    <li v-for="tarea in tareas" :key="tarea.id" :class="{ importante: tarea.importante }">
      <div class="divTarea">
        <div>
          <h2 class="tareaTitle" @click="completarTarea(tarea)">{{ tarea.title | capitalize }}</h2>
          <p class="incompleto" v-if="!tarea.bool">No se ha completado la tarea</p>
          <p class="completo" v-else>Has completado la tarea</p>
        </div>
        <div class="divBtnBorrar">
          <button class="btnBorrar" @click="borrarTarea(tarea)"><img src="assets/trash-can.svg" /></button>
        </div>
      </div>
    </li>
  </ul>
</div>
  `,
  methods: {
    // Agrega una nueva tarea a la lista de tareas
    agregarTarea() {
      const tarea = {
        id: this.tareas.length + 1,
        bool: false,
        title: this.nuevaTarea.trim(),
        importante: this.esImportante,
      };
      if (tarea.title) {
        if (tarea.importante) {
          // Insertar la tarea importante al principio de la lista
          this.tareas.unshift(tarea);
        } else {
          // Insertar la tarea al final de la lista
          this.tareas.push(tarea);
        }
        this.nuevaTarea = "";
        this.esImportante = false; // Reiniciar el estado de importancia
        this.guardarTareas();
      }
    },
    // Borra una tarea de la lista de tareas
    borrarTarea(tarea) {
      const index = this.tareas.indexOf(tarea);
      if (index !== -1) {
        this.tareas.splice(index, 1);
        this.guardarTareas(); // Guarda las tareas actualizadas en el almacenamiento local
      }
    },
    // Completa o descompleta una tarea
    completarTarea(tarea) {
      tarea.bool = !tarea.bool;
      this.guardarTareas(); // Guarda las tareas actualizadas en el almacenamiento local
    },
    // Guarda las tareas en el localStorage
    guardarTareas() {
      localStorage.setItem("tareas", JSON.stringify(this.tareas));
    },
  },
});
// Filtro para la transformar la primera letra en Uppercase
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
});

const app = new Vue({
  el: "#app",
  data: {},
});

