import { useRef, useState } from "react";
import "./App.css";
import { Ciudad } from "./components/Ciudad";

import agregar from "./assets/agregar.svg";
import eliminar from "./assets/eliminar.svg";
import reiniciar from "./assets/reiniciar.svg";
import { MyInput } from "./components/MyInput";
import { Loader } from "./components/Loader";

// const initialPoblacion = [
//   {
//     ciudad: 1,
//     coordenadas: { x: 20, y: 20 },
//   },
//   {
//     ciudad: 2,
//     coordenadas: { x: 300, y: 100 },
//   },
//   {
//     ciudad: 3,
//     coordenadas: { x: 123, y: 123 },
//   },
//   {
//     ciudad: 4,
//     coordenadas: { x: 385, y: 362 },
//   },
//   {
//     ciudad: 5,
//     coordenadas: { x: 258, y: 277 },
//   },
//   {
//     ciudad: 6,
//     coordenadas: { x: 486, y: 58 },
//   },
//   {
//     ciudad: 7,
//     coordenadas: { x: 114, y: 90 },
//   },
//   {
//     ciudad: 8,
//     coordenadas: { x: 20, y: 71 },
//   },
//   {
//     ciudad: 9,
//     coordenadas: { x: 186, y: 311 },
//   },
//   {
//     ciudad: 10,
//     coordenadas: { x: 212, y: 400 },
//   },
// ];

const initialPoblacion = [
  {
    ciudad: 1,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 2,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 3,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 4,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 5,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 6,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 7,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 8,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 9,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
  {
    ciudad: 10,
    coordenadas: {
      x: Math.floor(Math.random() * 801),
      y: Math.floor(Math.random() * 401),
    },
  },
];

function App() {
  const [poblacion, setPoblacion] = useState(initialPoblacion);
  const [ciudadInicio, setCiudadInicio] = useState(5);
  const [iteraciones, setIteraciones] = useState(100000);
  const [Pc, setPc] = useState(0.75);
  const [Pm, setPm] = useState(0.001);

  const [mejoresRutas, setMejoresRutas] = useState([]);
  const [rutaTexto, setRutaTexto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const canvasRef = useRef(null);

  const getCoordenadasCiudad = (ciudad) => {
    let x = 0,
      y = 0;
    for (let j = 0; j < poblacion.length; j++) {
      if (poblacion[j].ciudad === ciudad) {
        x = poblacion[j].coordenadas.x;
        y = poblacion[j].coordenadas.y;
      }
    }
    return { x, y };
  };

  const borrarRuta = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
  };

  const dibujarRuta = (ruta, canvas) => {
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 5;

    let x1 = 0,
      x2 = 0,
      y1 = 0,
      y2 = 0;

    for (let i = 0; i < ruta.length; i++) {
      if (i === ruta.length - 1) {
        ctx.strokeStyle = "#000";
        x1 = getCoordenadasCiudad(ruta[i]).x;
        y1 = getCoordenadasCiudad(ruta[i]).y;
        x2 = getCoordenadasCiudad(ruta[0]).x;
        y2 = getCoordenadasCiudad(ruta[0]).y;
      } else {
        ctx.strokeStyle = "#fff";
        x1 = getCoordenadasCiudad(ruta[i]).x;
        y1 = getCoordenadasCiudad(ruta[i]).y;
        x2 = getCoordenadasCiudad(ruta[i + 1]).x;
        y2 = getCoordenadasCiudad(ruta[i + 1]).y;
      }

      ctx.beginPath();
      ctx.moveTo(x1, height - y1);
      ctx.lineTo(x2, height - y2);
      ctx.stroke();
    }
  };

  const Calcular = async () => {
    setRutaTexto("");
    setIsLoading(true);

    const canvas = canvasRef.current;

    let ciudadades = poblacion.length;

    let rutas = mejoresRutas;

    let valoresRuta = [];

    let valoresRutaInicial = [];

    if (rutas.length !== ciudadades) {
      rutas = [];
      //Lenar las rutas con valores aleatorias
      for (let i = 0; i < ciudadades; i++) {
        valoresRuta.push(ciudadInicio);
        while (valoresRuta.length < ciudadades) {
          // Generar un número aleatorio
          let numero = Math.floor(Math.random() * ciudadades) + 1;

          // Verificar si el número ya está en el arreglo
          if (!valoresRuta.includes(numero)) {
            // Si no está repetido, agregarlo al arreglo
            valoresRuta.push(numero);
          }
        }
        rutas[i] = valoresRuta;
        valoresRutaInicial.push(rutas[i]);
        valoresRuta = [];
      }
    }

    // console.log(valoresRutaInicial);

    let fitnes = Fitnes(rutas);
    let count = 0,
      parent1 = [],
      parent2 = [],
      parent1_id,
      parent2_id,
      offSpring1 = [],
      offSpring2 = [],
      Parents__offSprings = [],
      best1 = [],
      best2 = [],
      mutacion = false;

    while (count < iteraciones) {
      Parents__offSprings = [];

      parent1_id = SeleccionTorneo(fitnes);
      parent2_id = SeleccionTorneo(fitnes);

      parent1 = rutas[parent1_id];
      parent2 = rutas[parent2_id];

      //==================== C O M B I N A C I O N ====================

      if (Math.round(Math.random() * 100) / 100 <= Pc) {
        let { child1, child2 } = CutAndCrossfill(parent1, parent2);
        parent1 = child1;
        parent2 = child2;
      } else {
        offSpring1 = parent1;
        offSpring2 = parent2;
      }

      //==================== M U T A C I O N ====================

      if (Math.round(Math.random() * 1000) / 1000 <= Pm) {
        // console.log("mutacion");
        let { newOffS1, newOffS2 } = SwapMutation(offSpring1, offSpring2);
        offSpring1 = newOffS1;
        offSpring2 = newOffS2;
        mutacion = true;
      }

      Parents__offSprings.push(parent1);
      Parents__offSprings.push(parent2);

      if (offSpring1.length > 0) {
        Parents__offSprings.push(offSpring1);
      }

      if (offSpring2.length > 0) {
        Parents__offSprings.push(offSpring2);
      }

      let { best_p_offS_1, best_p_offS_2 } =
        Mejores_2_Parents__0ffSpring(Parents__offSprings);
      best1 = best_p_offS_1;
      best2 = best_p_offS_2;

      rutas[parent1_id] = best1;
      rutas[parent2_id] = best2;

      if (mutacion) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        let dibujar = Fitnes(rutas);
        dibujarRuta(rutas[dibujar.indexOf(Math.min(...dibujar))], canvas);
        mutacion = false;
      }
      count++;
    }

    let dibujar = Fitnes(rutas);
    // console.log(rutas[dibujar.indexOf(Math.min(...dibujar))]);
    await new Promise((resolve) => setTimeout(resolve, 50));
    dibujarRuta(rutas[dibujar.indexOf(Math.min(...dibujar))], canvas);

    setRutaTexto(rutas[dibujar.indexOf(Math.min(...dibujar))]);
    setIsLoading(false);
  };

  const Mejores_2_Parents__0ffSpring = (Parents_0ffSpring) => {
    let best_p_offS_1,
      best_p_offS_2,
      fitnes__parents_offSprings = Fitnes(Parents_0ffSpring);

    best_p_offS_1 =
      Parents_0ffSpring[
        fitnes__parents_offSprings.indexOf(
          Math.min(...fitnes__parents_offSprings)
        )
      ];

    fitnes__parents_offSprings.pop(Math.min(...fitnes__parents_offSprings));

    best_p_offS_2 =
      Parents_0ffSpring[
        fitnes__parents_offSprings.indexOf(
          Math.min(...fitnes__parents_offSprings)
        )
      ];

    return { best_p_offS_1, best_p_offS_2 };
  };

  const Fitnes = (rutas) => {
    let ciudadades = rutas.length;

    let fitnes = [];
    let sumaDistancia = 0;
    let num1 = 0,
      num2 = 0;

    for (let i = 0; i < ciudadades; i++) {
      for (let j = 0; j < rutas[i].length; j++) {
        if (j === rutas[i].length - 1) {
          num1 = rutas[i][j];
          num2 = rutas[i][0];
        } else {
          num1 = rutas[i][j];
          num2 = rutas[i][j + 1];
        }

        sumaDistancia += Math.sqrt(
          Math.pow(
            poblacion[num1 - 1].coordenadas.x -
              poblacion[num2 - 1].coordenadas.x,
            2
          ) +
            Math.pow(
              poblacion[num1 - 1].coordenadas.y -
                poblacion[num2 - 1].coordenadas.y,
              2
            )
        );
      }
      fitnes.push(sumaDistancia);
      sumaDistancia = 0;
    }

    return fitnes;
  };

  const SwapMutation = (offS1, offS2) => {
    let newOffS1 = offS1,
      newOffS2 = offS2;

    // Muatar el primer offSpring
    let gen1 = Math.floor(Math.random() * offS1.length),
      gen2 = Math.floor(Math.random() * offS1.length);

    while (gen1 === 0) {
      gen1 = Math.floor(Math.random() * offS1.length);
    }

    while (gen2 === 0) {
      gen2 = Math.floor(Math.random() * offS1.length);
    }

    let gen1_value = newOffS1[gen1],
      gen2_value = newOffS1[gen2];

    newOffS1[gen1] = gen2_value;
    newOffS1[gen2] = gen1_value;

    // Mutar el segundo offSpring
    gen1 = Math.floor(Math.random() * offS2.length);
    gen2 = Math.floor(Math.random() * offS2.length);

    while (gen1 === 0) {
      gen1 = Math.floor(Math.random() * offS2.length);
    }

    while (gen2 === 0) {
      gen2 = Math.floor(Math.random() * offS2.length);
    }

    gen1_value = newOffS2[gen1];
    gen2_value = newOffS2[gen2];

    newOffS2[gen1] = gen2_value;
    newOffS2[gen2] = gen1_value;

    return { newOffS1, newOffS2 };
  };

  const CutAndCrossfill = (p1, p2) => {
    const tamanio_arreglo = p1.length;
    const positionRandom = Math.floor(Math.random() * tamanio_arreglo);

    let child1 = p1.slice(0, positionRandom),
      child2 = p2.slice(0, positionRandom);

    for (let i = 0; i < tamanio_arreglo; i++) {
      if (child1.indexOf(p2[i]) === -1) {
        child1.push(p2[i]);
      }

      if (child2.indexOf(p1[i]) === -1) {
        child2.push(p1[i]);
      }
    }

    return { child1, child2 };
  };

  const SeleccionTorneo = (fitnes) => {
    const par = [];

    const seleccion1 = Math.floor(Math.random() * fitnes.length);
    const seleccion2 = Math.floor(Math.random() * fitnes.length);

    par.push(fitnes[seleccion1]);
    par.push(fitnes[seleccion2]);

    // console.log(seleccion1, seleccion2);
    // console.log(Math.min(...par));

    return fitnes.indexOf(Math.min(...par));
  };

  const agregarCiudad = () => {
    const randomX = Math.floor(Math.random() * 800) + 1;

    const randomY = Math.floor(Math.random() * 400) + 1;

    setRutaTexto("");
    borrarRuta();

    setPoblacion([
      ...poblacion,
      {
        ciudad: poblacion.length + 1,
        coordenadas: {
          x: randomX,
          y: randomY,
        },
      },
    ]);

    setCiudadInicio(1);
  };

  const eliminarCiudad = () => {
    const poblacionNueva = [...poblacion];
    poblacionNueva.pop();
    setPoblacion(poblacionNueva);
    setRutaTexto("");
    borrarRuta();
    setCiudadInicio(1);
  };

  const reiniciarPoblacion = () => {
    setPoblacion(initialPoblacion);
    setRutaTexto("");
    borrarRuta();
    setCiudadInicio(5);
  };

  const handleInputEmpezarCiudad = (event) => {
    const { value } = event.target;

    if (value.length === 0 || (value <= poblacion.length && value > 0)) {
      setCiudadInicio(parseInt(value));
    }
  };

  const handleInputIteraciones = (event) => {
    const { value } = event.target;

    if ((value.length === 0 || value > 0) && value.length <= 7) {
      setIteraciones(parseInt(value));
    }
  };

  const handleInputPc = (event) => {
    const { value } = event.target;

    if (value >= 0.65 && value <= 0.8) {
      setPc(parseFloat(value));
    }
  };

  const handleInputPm = (event) => {
    const { value } = event.target;

    if (value >= 0.001 && value <= 0.01) {
      setPm(parseFloat(value));
    }
  };

  return (
    <>
      <nav>
        <h1>El Problema del Agente viajero</h1>

        <div className="barra">
          <MyInput
            titulo="Iteraciones"
            type="number"
            placeholder="Numero de Iteraciones"
            handleOnChange={handleInputIteraciones}
            value={iteraciones}
          />

          <MyInput
            titulo="Empezar por la ciudad"
            type="number"
            placeholder="Numero de la ciudad"
            handleOnChange={handleInputEmpezarCiudad}
            value={ciudadInicio}
          />

          <MyInput
            titulo="Pc"
            type="number"
            placeholder="Probabilidad de cruce"
            handleOnChange={handleInputPc}
            value={Pc}
            step={0.01}
          />

          <MyInput
            titulo="Pm"
            type="number"
            placeholder="Probabilidad de mutacion"
            handleOnChange={handleInputPm}
            value={Pm}
            step={0.001}
          />

          <div className="card">
            <label>&#8205;</label>
            <button
              type="button"
              onClick={() => Calcular()}
              disabled={
                isLoading === false
                  ? poblacion.length > 2
                    ? false
                    : true
                  : true
              }
            >
              Obtner Ruta
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="rutaTexto">
          <h4>Ruta mas corta:</h4>
          {isLoading && <Loader />}
          {rutaTexto &&
            rutaTexto.map((ciudad) => (
              <h3 className="ciudadTexto" key={ciudad}>
                {ciudad}
              </h3>
            ))}
        </div>
        <div className="poblacion">
          <canvas className="rutas" ref={canvasRef} width={800} height={400} />
          {poblacion.map((el, index) => (
            <Ciudad
              ciudad={el.ciudad}
              coordenadas={el.coordenadas}
              ciudadInicio={ciudadInicio}
              key={index + 1}
            />
          ))}
        </div>
        <div className="btn-card">
          <button
            className="btn btn_agregar"
            type="button"
            onClick={() => agregarCiudad()}
            disabled={isLoading}
          >
            <img src={agregar} className="btn-icon" alt="React logo" />
          </button>

          <button
            className="btn btn_eliminar"
            type="button"
            onClick={() => eliminarCiudad()}
            disabled={isLoading}
          >
            <img src={eliminar} className="btn-icon" alt="React logo" />
          </button>

          <button
            className="btn btn_reiniciar"
            type="button"
            onClick={() => reiniciarPoblacion()}
            disabled={isLoading}
          >
            <img src={reiniciar} className="btn-icon" alt="React logo" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
