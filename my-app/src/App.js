import React, { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Pages from "./components/Pages/Pages";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    token ? setAuth(true) : setAuth(false);
  }, []);

  return (
    <div>
      <header>
        <Navigation auth={auth} setAuth={setAuth} />
      </header>
      <main>
        <Pages auth={auth} setAuth={setAuth} />
      </main>
    </div>
  );
}

export default App;
