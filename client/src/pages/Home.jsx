

const Home = () => {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold  mb-4 text-slate-800">
        Welcome to my Auth App!
      </h1>
      <p className="mb-4 text-slate-700">
        Esta es una aplicación web Full Stack construida con el stack MERN
        (MongoDB, Express, React, Node.js). Incluye funciones de autenticación
        que permiten a los usuarios registrarse, iniciar sesión y cerrar sesión,
        y brinda acceso a rutas protegidas solo para usuarios autenticados
      </p>
      <p className="mb-4 text-slate-700">
        El frontend de la aplicación está construido con React y utiliza React
        Router para el enrutamiento del lado del cliente. El backend está
        desarrollado con Node.js y Express, y utiliza MongoDB como base de
        datos. La autenticación se implementa utilizando Tokens Web JSON (JWT)..
      </p>
      <p className="mb-4 text-slate-700">
        Esta aplicación está pensada como un punto de partida para construir
        aplicaciones web Full Stack con autenticación utilizando el stack
        MERN.
      </p>
    </div>
  );
}

export default Home