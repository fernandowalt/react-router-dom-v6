import {Outlet, useSearchParams } from 'react-router-dom';
import { getInvoices } from '../data';
import { QueryNavLink } from '../locations/queryNavLink';


export default function Invoices() {
  const invoices = getInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ borderRight: 'solid 1px', padding: '1rem' }}>
        <input
        placeholder={'buscar factura'}
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            const filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter((invoice) => {
            const filter = searchParams.get('filter');
            if (!filter) return true;
            const name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
            <QueryNavLink
              style={({ isActive }) => {
                return {
                  textDecoration: 'none',
                  display: 'block',
                  margin: '1rem 0',
                  color: isActive ? 'green' : 'blue',
                };
              }}
              to={`/invoices/${invoice.number}`}
              key={invoice.name}
            >
              {invoice.name}
            </QueryNavLink>
          ))}
      </nav>
      <Outlet />
    </div>
  );
}
