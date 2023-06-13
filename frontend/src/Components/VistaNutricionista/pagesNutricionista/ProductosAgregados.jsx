import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateClienteProducto from "./Update";

const ProductosAgregados = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [mostrarUpdate, setMostrarUpdate] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const peticionProductos = async () => {
    try {
      const url = `https://apinutritecbd.azurewebsites.net/Nutricionista/obtenerproductosnutricionista/${localStorage.getItem(
        "cedula"
      )}`;
      const response = await axios.get(url);

      setProductos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    peticionProductos();
  }, []);

  const handleUpdate = (elemento) => {
    console.log("update");
    setMostrarUpdate(true);
    setProductoSeleccionado(elemento);
  };

  const eliminarElemento = async (lista, elemento) => {
    const url = `https://apinutritecbd.azurewebsites.net/Externos/eliminarproductos/${elemento.codigoBarra}`;
    try {
      await axios.delete(url);
      alert("Se eliminó el producto exitosamente");
      const nuevaLista = lista.filter((index) => {
        return index.codigoBarra !== elemento.codigoBarra;
      });
      setProductos(nuevaLista);
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div className="col-md-8">
      {productos.length > 0 && (
        <div className="mt-4">
          <h4>Alimentos encontrados:</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Código de Barras</th>
                <th>Descripción</th>
                <th>Tamaño porción</th>
                <th>Energía</th>
                <th>Grasa</th>
                <th>Sodio</th>
                <th>Carbohidratos</th>
                <th>Proteína</th>
                <th>Vitaminas</th>
                <th>Calcio</th>
                <th>Hierro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((alimento, index) => (
                <tr key={index}>
                  <td>{alimento.nombre}</td>
                  <td>{alimento.codigoBarra}</td>
                  <td>{alimento.descripcion}</td>
                  <td>{alimento.tamanPorcion}</td>
                  <td>{alimento.energia}</td>
                  <td>{alimento.grasa}</td>
                  <td>{alimento.sodio}</td>
                  <td>{alimento.carbohidratos}</td>
                  <td>{alimento.proteina}</td>
                  <td>{alimento.vitaminas}</td>
                  <td>{alimento.calcio}</td>
                  <td>{alimento.hierro}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleUpdate(alimento)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => {
                        eliminarElemento(productos, alimento);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {mostrarUpdate && (
        <UpdateClienteProducto
          id={productoSeleccionado}
          fun={setMostrarUpdate}
          // Aquí puedes pasar otras props necesarias
        />
      )}
    </div>
  );
};

export default ProductosAgregados;
