import { useState, useEffect } from "react";
import styles from "./TratamientosHoy.module.css";


const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function TratamientosHoy() {
    const [tratamientos, setTratamientos] = useState([]);
    const [tratamientosHoy, setTratamientosHoy] = useState([]);

    // Cargar tratamientos desde localStorage
    useEffect(() => {
        const saved = localStorage.getItem("tratamientos");
        if (saved) setTratamientos(JSON.parse(saved));
    }, []);

    // Filtrar tratamientos activos hoy
    useEffect(() => {
        const hoy = new Date();
        const diaHoy = diasSemana[hoy.getDay()];

        const activosHoy = tratamientos.filter(
            (t) =>
                Array.isArray(t.dias) &&
                t.dias.map((d) => d.toLowerCase()).includes(diaHoy.toLowerCase())
        );

        setTratamientosHoy(activosHoy);
    }, [tratamientos]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {tratamientosHoy.length > 0
                    ? `Tratamientos Activos Hoy (${tratamientosHoy.length})`
                    : "Tratamientos Activos Hoy"}
            </h2>

            <ul className={styles.lista}>
                {tratamientosHoy.length === 0 && (
                    <li className={styles.noTratamientos}>No hay tratamientos para hoy</li>
                )}
                {tratamientosHoy.map((t) => (
                    <li key={t.id} className={styles.listaItem}>
                        <div className={styles.listaItemInfo}>
                            <strong>{t.nombreTratamiento}</strong> - {t.descripcion} <br />
                            Duración: {t.duracionDias} días | Horario: {t.horario} | Dosis: {t.dosis} <br />
                            Días: {t.dias.join(", ")}
                            <div className={styles.alerta}>¡Debes tomar este tratamiento hoy!</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
