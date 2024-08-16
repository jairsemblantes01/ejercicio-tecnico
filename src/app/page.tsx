
export default function Home() {
  return (
    <div>
      <div className="header">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="add-button">Agregar</button>
      </div>
      <div className="container">
      <div className="table-container">
        <table className="product-table">
          <thead>
          <tr>
            <th>Logo</th>
            <th>Nombre del producto</th>
            <th>Descripción</th>
            <th>Fecha de liberación</th>
            <th>Fecha de reestructuración</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>Nombre del producto</td>
            <td>Descripción</td>
            <td>01/01/2000</td>
            <td>01/01/2001</td>
            <td className="actions">⋮</td>
          </tr>
          <tr>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>Nombre del producto</td>
            <td>Descripción</td>
            <td>01/01/2000</td>
            <td>01/01/2001</td>
            <td className="actions">⋮</td>
          </tr>
          <tr>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>Nombre del producto</td>
            <td>Descripción</td>
            <td>01/01/2000</td>
            <td>01/01/2001</td>
            <td className="actions">⋮</td>
          </tr>
          <tr>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>Nombre del producto</td>
            <td>Descripción</td>
            <td>01/01/2000</td>
            <td>01/01/2001</td>
            <td className="actions">⋮</td>
          </tr>
          <tr>
            <td>
              <div className="logo">JG</div>
            </td>
            <td>Nombre del producto</td>
            <td>Descripción</td>
            <td>01/01/2000</td>
            <td>01/01/2001</td>
            <td className="actions">⋮</td>
          </tr>
          </tbody>
        </table>
      </div>

      {/* ChangeQuantity */}
      <div className="pagination">
        <span>5 Resultados</span>
        <select className="results-select">
          <option>5</option>
          <option>10</option>
          <option>20</option>
        </select>
      </div>
    </div>
    </div>
  );
}
