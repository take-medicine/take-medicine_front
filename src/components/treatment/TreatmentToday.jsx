import { useState, useEffect } from "react";
import styles from "./TratamientosHoy.module.css";


const WeekDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function TratamientosHoy() {
    const [Treatment, setTratamientos] = useState([]);
    const [TreatmentToday, setTreatmentsToday] = useState([]);

    // Cargar tratamientos desde localStorage
    useEffect(() => {
        const saved = localStorage.getItem("treatmentsDB");
        if (saved) setTratamientos(JSON.parse(saved));
    }, []);

    // Filtrar tratamientos activos hoy
    useEffect(() => {
        const today = new Date();
        const dayNow = WeekDays[today.getDay()];

        const ActiveNow = Treatment.filter(
            (t) =>
                Array.isArray(t.dias) &&
                t.dias.map((d) => d.toLowerCase()).includes(dayNow.toLowerCase())
        );

        setTreatmentsToday(ActiveNow);
    }, [Treatment]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {TreatmentToday.length > 0
                    ? `Tratamientos Activos Hoy (${TreatmentToday.length})`
                    : "Tratamientos Activos Hoy"}
            </h2>

            <ul className={styles.lista}>
                {TreatmentToday.length === 0 && (
                    <li className={styles.noTratamientos}>No hay tratamientos para hoy</li>
                )}
                {TreatmentToday.map((t) => (
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
