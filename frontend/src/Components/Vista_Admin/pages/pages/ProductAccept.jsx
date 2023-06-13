import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

const ProductApproval = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const url = 'https://apinutritecbd.azurewebsites.net/Administrador/inactivos';
    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
 // fyncion que permite manejar los productos acceptado
  const handleProductApproval = async (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].estado = true;
    setProducts(updatedProducts);

    const approvedProduct = updatedProducts[index];
    console.log(approvedProduct)
    try {
      // Enviar el producto aprobado a la API o a la base de datos
      const response=await axios.post(`https://apinutritecbd.azurewebsites.net/Administrador/validarproducto`,{
        cod_barras:approvedProduct.codigobarra,
        validacion:"aceptar"
     
      });
      alert("producto acceptado")
    } catch (error) {
      alert("Problemas al guardar el producto")
      console.error(error);
    }
  };

  const handleProductReject = async (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].estado = false;
    setProducts(updatedProducts);

    const rejectedProduct = updatedProducts[index];

    try {
      // Eliminar el producto rechazado de la API o de la base de datos
      await axios.delete(`https://apinutritecbd.azurewebsites.net/Administrador/${rejectedProduct.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveProduct = async (index) => {
    const removedProduct = products[index];

    try {
      // Eliminar el producto de la API o de la base de datos
      await axios.delete(`https://apinutritecbd.azurewebsites.net/Externos/eliminarproductos/${removedProduct.codigobarra}`);
    } catch (error) {
      console.error(error);
    }

    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Codigo de Barra</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Tamaño Porcion</th>
              <th>Energia</th>
              <th>Grasa</th>
              <th>Sodio</th>
              <th>Carbohidratos</th>
              <th>Proteina</th>
              <th>Vitaminas</th>
              <th>Calcio</th>
              <th>Hierro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.codigobarra}</td>
                <td>{product.nombre}</td>
                <td>{product.descripcion}</td>
                <td>{product.taman_porcion}</td>
                <td>{product.energia}</td>
                <td>{product.grasa}</td>
                <td>{product.sodio}</td>
                <td>{product.carbohidratos}</td>
                <td>{product.proteina}</td>
                <td>{product.vitaminas}</td>
                <td>{product.calcio}</td>
                <td>{product.hierro}</td>
                <td>
                  {product.estado ? (
                    <Button variant="success" disabled>Aprobado</Button>
                  ) : (
                    <Button variant="success" onClick={() => handleProductApproval(index)}>
                      Aprobar
                    </Button>
                  )}
                  {product.estado ? (
                    <Button variant="danger" disabled>Rechazado</Button>
                  ) : (
                    <Button variant="danger" onClick={() => handleProductReject(index)}>
                      Rechazar
                    </Button>
                  )}
                  <Button variant="danger" onClick={() => handleRemoveProduct(index)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ProductApproval;
