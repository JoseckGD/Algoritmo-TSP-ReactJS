import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Ciudad } from "./components/Ciudad";

import agregar from "./assets/agregar.svg";
import eliminar from "./assets/eliminar.svg";
import reiniciar from "./assets/reiniciar.svg";
import { MyInput } from "./components/MyInput";
import { Loader } from "./components/Loader";
import "react-tooltip/dist/react-tooltip.css";
import { MySelect } from "./components/MySelect";

let aeropuertos = [
  {
    ciudad: "MEX",
    aeropuerto: "Aeropuerto Internacional de la Ciudad de México",
    coordenadas: {
      latitud: 19.4363,
      longitud: -99.0721,
      x: 402,
      y: 254,
    },
  },
  {
    ciudad: "CUN",
    aeropuerto: "Aeropuerto Internacional de Cancún",
    coordenadas: {
      latitud: 21.0405,
      longitud: -86.874,
      x: 1000,
      y: 54,
    },
  },
  {
    ciudad: "GDL",
    aeropuerto: "Aeropuerto Internacional de Guadalajara",
    coordenadas: {
      latitud: 20.5255,
      longitud: -103.3076,
      x: 12,
      y: 361,
    },
  },
  {
    ciudad: "MTY",
    aeropuerto: "Aeropuerto Internacional de Monterrey",
    coordenadas: {
      latitud: 25.7785,
      longitud: -100.1068,
      x: 347,
      y: 74,
    },
  },
  {
    ciudad: "TIJ",
    aeropuerto: "Aeropuerto Internacional de Tijuana",
    coordenadas: {
      latitud: 32.5411,
      longitud: -116.9709,
      x: 9,
      y: 614,
    },
  },
  {
    ciudad: "PVR",
    aeropuerto: "Aeropuerto Internacional de Puerto Vallarta",
    coordenadas: {
      latitud: 20.6801,
      longitud: -105.2542,
      x: 89,
      y: 280,
    },
  },
  {
    ciudad: "MID",
    aeropuerto: "Aeropuerto Internacional de Mérida",
    coordenadas: {
      latitud: 20.9374,
      longitud: -89.6574,
      x: 600,
      y: 491,
    },
  },
  {
    ciudad: "SJD",
    aeropuerto: "Aeropuerto Internacional de Los Cabos",
    coordenadas: {
      latitud: 23.1518,
      longitud: -109.7214,
      x: 61,
      y: 82,
    },
  },
  {
    ciudad: "VER",
    aeropuerto: "Aeropuerto Internacional de Veracruz",
    coordenadas: {
      latitud: 19.1445,
      longitud: -96.1875,
      x: 505,
      y: 311,
    },
  },
  {
    ciudad: "OAX",
    aeropuerto: "Aeropuerto Internacional de Oaxaca",
    coordenadas: {
      latitud: 16.9996,
      longitud: -96.7266,
      x: 497,
      y: 637,
    },
  },
  {
    ciudad: "HMO",
    aeropuerto: "Aeropuerto Internacional de Hermosillo",
    coordenadas: {
      latitud: 29.0958,
      longitud: -111.047,
      x: 80,
      y: 173,
    },
  },
  {
    ciudad: "CJS",
    aeropuerto: "Aeropuerto Internacional Abraham González",
    coordenadas: {
      latitud: 31.6361,
      longitud: -106.4267,
      x: 156,
      y: 432,
    },
  },
  {
    ciudad: "CUL",
    aeropuerto: "Aeropuerto Internacional Federal de Culiacán",
    coordenadas: {
      latitud: 24.7645,
      longitud: -107.4745,
      x: 119,
      y: 209,
    },
  },
  {
    ciudad: "TAM",
    aeropuerto: "Aeropuerto Internacional General Francisco Javier Mina",
    coordenadas: {
      latitud: 22.2964,
      longitud: -97.8659,
      x: 594,
      y: 155,
    },
  },
  {
    ciudad: "LAP",
    aeropuerto: "Aeropuerto Internacional Manuel Márquez de León",
    coordenadas: {
      latitud: 24.076,
      longitud: -110.3637,
      x: 46,
      y: 78,
    },
  },
  {
    ciudad: "PBC",
    aeropuerto: "Aeropuerto Internacional de Puebla",
    coordenadas: {
      latitud: 19.1585,
      longitud: -98.3714,
      x: 439,
      y: 314,
    },
  },
  {
    ciudad: "ZIH",
    aeropuerto: "Aeropuerto Internacional de Ixtapa-Zihuatanejo",
    coordenadas: {
      latitud: 17.6037,
      longitud: -101.4627,
      x: 49,
      y: 209,
    },
  },
  {
    ciudad: "BJX",
    aeropuerto: "Aeropuerto Internacional de Guanajuato",
    coordenadas: {
      latitud: 20.9935,
      longitud: -101.4806,
      x: 26,
      y: 309,
    },
  },
  {
    ciudad: "ACA",
    aeropuerto: "Aeropuerto Internacional de Acapulco",
    coordenadas: {
      latitud: 16.7569,
      longitud: -99.7534,
      x: 407,
      y: 495,
    },
  },
  //Aeropuerto Internacional de Torreón (TRC): 25.5685° N, 103.4101° W

  {
    ciudad: "TRC",
    aeropuerto: "Aeropuerto Internacional de Torreón",
    coordenadas: {
      latitud: 25.5614,
      longitud: -103.4101,
      x: 40,
      y: 45,
    },
  },
];

let aeropuertos_10 = [
  {
    ciudad: "MEX",
    aeropuerto: "Aeropuerto Internacional de la Ciudad de México",
    coordenadas: {
      latitud: 19.4363,
      longitud: -99.0721,
      x: 402,
      y: 254,
    },
  },
  {
    ciudad: "CUN",
    aeropuerto: "Aeropuerto Internacional de Cancún",
    coordenadas: {
      latitud: 21.0405,
      longitud: -86.874,
      x: 1000,
      y: 54,
    },
  },
  {
    ciudad: "GDL",
    aeropuerto: "Aeropuerto Internacional de Guadalajara",
    coordenadas: {
      latitud: 20.5255,
      longitud: -103.3076,
      x: 12,
      y: 361,
    },
  },
  {
    ciudad: "MTY",
    aeropuerto: "Aeropuerto Internacional de Monterrey",
    coordenadas: {
      latitud: 25.7785,
      longitud: -100.1068,
      x: 347,
      y: 74,
    },
  },
  {
    ciudad: "TIJ",
    aeropuerto: "Aeropuerto Internacional de Tijuana",
    coordenadas: {
      latitud: 32.5411,
      longitud: -116.9709,
      x: 9,
      y: 614,
    },
  },
  {
    ciudad: "PVR",
    aeropuerto: "Aeropuerto Internacional de Puerto Vallarta",
    coordenadas: {
      latitud: 20.6801,
      longitud: -105.2542,
      x: 89,
      y: 280,
    },
  },
  {
    ciudad: "MID",
    aeropuerto: "Aeropuerto Internacional de Mérida",
    coordenadas: {
      latitud: 20.9374,
      longitud: -89.6574,
      x: 600,
      y: 491,
    },
  },
  {
    ciudad: "SJD",
    aeropuerto: "Aeropuerto Internacional de Los Cabos",
    coordenadas: {
      latitud: 23.1518,
      longitud: -109.7214,
      x: 61,
      y: 82,
    },
  },
  {
    ciudad: "VER",
    aeropuerto: "Aeropuerto Internacional de Veracruz",
    coordenadas: {
      latitud: 19.1445,
      longitud: -96.1875,
      x: 505,
      y: 311,
    },
  },
  {
    ciudad: "OAX",
    aeropuerto: "Aeropuerto Internacional de Oaxaca",
    coordenadas: {
      latitud: 16.9996,
      longitud: -96.7266,
      x: 497,
      y: 637,
    },
  },
];

const initialAeropuertos = [
  {
    ciudad: "MEX",
    aeropuerto: "Aeropuerto Internacional de la Ciudad de México",
    coordenadas: {
      x: 479,
      y: 108,
    },
  },
  {
    ciudad: "CUN",
    aeropuerto: "Aeropuerto Internacional de Cancún",
    coordenadas: {
      x: 796,
      y: 143,
    },
  },
  {
    ciudad: "GDL",
    aeropuerto: "Aeropuerto Internacional de Guadalajara",
    coordenadas: {
      x: 369,
      y: 132,
    },
  },
  {
    ciudad: "MTY",
    aeropuerto: "Aeropuerto Internacional de Monterrey",
    coordenadas: {
      x: 452,
      y: 247,
    },
  },
  {
    ciudad: "TIJ",
    aeropuerto: "Aeropuerto Internacional de Tijuana",
    coordenadas: {
      x: 13,
      y: 396,
    },
  },
  {
    ciudad: "PVR",
    aeropuerto: "Aeropuerto Internacional de Puerto Vallarta",
    coordenadas: {
      x: 318,
      y: 135,
    },
  },
  {
    ciudad: "SJD",
    aeropuerto: "Aeropuerto Internacional de Los Cabos",
    coordenadas: {
      x: 202,
      y: 190,
    },
  },
  {
    ciudad: "MID",
    aeropuerto: "Aeropuerto Internacional de Mérida",
    coordenadas: {
      x: 723,
      y: 141,
    },
  },
  {
    ciudad: "VER",
    aeropuerto: "Aeropuerto Internacional de Veracruz",
    coordenadas: {
      x: 554,
      y: 101,
    },
  },
  {
    ciudad: "OAX",
    aeropuerto: "Aeropuerto Internacional de Oaxaca",
    coordenadas: {
      x: 540,
      y: 54,
    },
  },
];

function App() {
  const [poblacion, setPoblacion] = useState(initialAeropuertos);
  const [ciudadInicio, setCiudadInicio] = useState(0);
  const [iteraciones, setIteraciones] = useState(100000);
  const [Pc, setPc] = useState(0.75);
  const [Pm, setPm] = useState(0.01);

  const [mejoresRutas, setMejoresRutas] = useState([]);
  const [rutaTexto, setRutaTexto] = useState(null);
  const [distanciaMejorRuta, setDistanciaMejorRuta] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [porcentaje, setPorcentaje] = useState(0);

  const canvasRef = useRef(null);

  useEffect(() => {
    //    Obtener cordenas x,y
    // console.log(transformarCoordenadas(aeropuertos));

    setPoblacion(transformarCoordenadas(aeropuertos));
    aeropuertos = transformarCoordenadas(aeropuertos);

    // setPoblacion(transformarCoordenadas(aeropuertos_10));
    // aeropuertos_10 = transformarCoordenadas(aeropuertos_10);
  }, []);

  function transformarCoordenadas(aeropuertos) {
    const LON_MIN = -117.488392;
    const LON_MAX = -86.708214;
    const LAT_MIN = 14.540151;
    const LAT_MAX = 32.718576;

    const ANCHO = 800;
    const ALTO = 400;

    aeropuertos.forEach((aeropuerto) => {
      const x = Math.round(
        ((aeropuerto.coordenadas.longitud - LON_MIN) / (LON_MAX - LON_MIN)) *
          ANCHO
      );
      const y = Math.round(
        (1 - (aeropuerto.coordenadas.latitud - LAT_MIN) / (LAT_MAX - LAT_MIN)) *
          ALTO
      );
      aeropuerto.coordenadas.x = x;
      aeropuerto.coordenadas.y = ALTO - y;

      // console.log(aeropuerto.coordenadas.x, aeropuerto.coordenadas.y);
    });

    return aeropuertos;
  }

  const getCoordenadasCiudad = (ciudad) => {
    let x = 0,
      y = 0;
    for (let j = 0; j < poblacion.length; j++) {
      if (j + 1 === ciudad) {
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
    if (ciudadInicio === 0) {
      alert("Selecciona un aeropuerto para empezar");
      return;
    }
    setPorcentaje(0);
    setDistanciaMejorRuta("");

    const porcentajeIteraciones = Math.floor(iteraciones / 100);
    let countActual = porcentajeIteraciones;

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

    // console.log("Inicialización de la población", valoresRutaInicial);

    let fitnes = Fitnes(rutas);

    // console.log("Fitnes", fitnes);

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
      mutacion = true;

    let mejorRuta = [],
      mejorRutaAeropuerto = [],
      dibujar = [];

    // parent1_id = SeleccionTorneo(fitnes);
    // parent2_id = SeleccionTorneo(fitnes);

    // parent1 = rutas[parent1_id];
    // parent2 = rutas[parent2_id];

    // console.log("Ruta del padre 1: " + parent1);
    // console.log("Ruta del padre 2: " + parent2);

    while (count < iteraciones) {
      if (count === countActual) {
        setPorcentaje((porcentaje) => porcentaje + 1);
        countActual += porcentajeIteraciones;
      }
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
        dibujar = Fitnes(rutas);
        dibujarRuta(rutas[dibujar.indexOf(Math.min(...dibujar))], canvas);
        mutacion = false;
      }
      count++;
    }

    dibujar = Fitnes(rutas);
    // console.log(rutas[dibujar.indexOf(Math.min(...dibujar))]);
    await new Promise((resolve) => setTimeout(resolve, 50));
    mejorRuta = rutas[dibujar.indexOf(Math.min(...dibujar))];
    mejorRutaAeropuerto = [];

    dibujarRuta(mejorRuta, canvas);

    console.log(mejorRuta);

    mejorRuta.map((el) => {
      mejorRutaAeropuerto.push(poblacion[el - 1].ciudad);
    });

    setMejoresRutas(rutas);
    setRutaTexto(mejorRutaAeropuerto);
    setIsLoading(false);
    setDistanciaMejorRuta(Math.min(...dibujar).toFixed(3));
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
        //Checar si ya llego al final de la ruta
        //Calcular la distanica de la ultima ciudad a la ciudad de incio
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

    // console.log("Seleccion torneo (2 opciones): ");
    // console.log(seleccion1, seleccion2);
    // console.log("Fitnes de los selecionados: " + par);
    // console.log("Gano: " + fitnes.indexOf(Math.min(...par)));

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
    setMejoresRutas([]);
    setDistanciaMejorRuta("");
    setPoblacion(aeropuertos);
    setRutaTexto("");
    borrarRuta();
    setCiudadInicio(0);
    setIteraciones(100000);
  };

  const handleInputEmpezarCiudad = (event) => {
    const { value } = event.target;

    //    if (value.length === 0 || (value <= poblacion.length && value > 0)) {
    setCiudadInicio(parseInt(value));
    setMejoresRutas([]);
    //  }
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
        <h1>El Problema del Agente Viajero</h1>

        <div className="barra">
          <MyInput
            titulo="Iteraciones"
            type="number"
            placeholder="Numero de Iteraciones"
            handleOnChange={handleInputIteraciones}
            value={iteraciones}
            disabled={isLoading === true ? true : false}
          />

          <MySelect
            titulo="Empezar por el aeropuerto"
            data={poblacion}
            value={ciudadInicio}
            handleOnChange={handleInputEmpezarCiudad}
            disabled={isLoading === true ? true : false}
          />

          <MyInput
            titulo="Pc"
            type="number"
            placeholder="Probabilidad de cruce"
            handleOnChange={handleInputPc}
            value={Pc}
            step={0.01}
            disabled={isLoading === true ? true : false}
          />

          <MyInput
            titulo="Pm"
            type="number"
            placeholder="Probabilidad de mutacion"
            handleOnChange={handleInputPm}
            value={Pm}
            step={0.001}
            disabled={isLoading === true ? true : false}
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
          <h4>Mejor ruta:</h4>
          {isLoading && <Loader porcentaje={porcentaje} />}
          {rutaTexto &&
            rutaTexto.map((ciudad) => (
              <h3 className="ciudadTexto" key={ciudad}>
                {ciudad}
              </h3>
            ))}
        </div>
        <div className="poblacion">
          <img src="/mapa.png" alt="mapa" width={800} height={400} />

          <canvas
            className="rutas"
            ref={canvasRef}
            width={800}
            height={400}
            style={{ position: "absolute", left: 16 }}
          ></canvas>
          {poblacion.map((el, index) => (
            <Ciudad
              ciudad={el.ciudad}
              aeropuerto={el.aeropuerto}
              coordenadas={el.coordenadas}
              ciudadInicio={ciudadInicio}
              numero={index + 1}
              key={index + 1}
            />
          ))}
        </div>
        <div className="btn-card">
          {/* <button
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
          </button> */}

          <button
            className="btn btn_reiniciar"
            type="button"
            onClick={() => reiniciarPoblacion()}
            disabled={isLoading}
          >
            <img src={reiniciar} className="btn-icon" alt="React logo" />
          </button>

          <div className="distanciaRutaTexto">
            <h4>Distancia de la mejor ruta:</h4>
            {distanciaMejorRuta.length !== 0 && distanciaMejorRuta + "px"}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
