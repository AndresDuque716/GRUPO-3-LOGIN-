import { StatsCard } from './StatsCard';

export const Stats = () => {

return(

<div
style={{
display:'flex',
gap:'20px',
flexWrap:'wrap'
}}
>

<StatsCard
titulo="Total Estudiantes"
valor="10"
color="#3B82F6"
/>

<StatsCard
titulo="Pagos Realizados"
valor="8"
color="#22C55E"
/>

<StatsCard
titulo="Pendientes"
valor="2"
color="#EF4444"
/>

<StatsCard
titulo="Total Recaudado"
valor="$1200"
color="#2563EB"
/>

</div>

);

};