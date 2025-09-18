import { useState, useEffect } from "react";
import styles from "./addTreatment.module.css";

export default function TratamientosMenu() {
    const [tratamientos, setTratamientos] = useState([]);
    const [form, setForm] = useState({
        nombreTratamiento: "",
        descripcion: "",
        duracionDias: "",
        horario: "",
        dias: [],
        dosis: "",
    });

    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    useEffect(() => {
        const saved = localStorage.getItem("tratamientos");
        if (saved) setTratamientos(JSON.parse(saved));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            let nuevosDias = [...form.dias];
            if (checked) nuevosDias.push(value);
            else nuevosDias = nuevosDias.filter((d) => d !== value);
            setForm({ ...form, dias: nuevosDias });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const guardarTratamiento = () => {
        if (form.nombreTratamiento.trim() === "" || form.duracionDias === "" || form.dias.length === 0) {
            alert("Nombre, duración y al menos un día son obligatorios.");
            return;
        }

        const nuevo = { id: Date.now(), ...form };
        const nuevosTratamientos = [...tratamientos, nuevo];
        setTratamientos(nuevosTratamientos);
        localStorage.setItem("tratamientos", JSON.stringify(nuevosTratamientos));

        // Placeholder para guardar en DB
        console.log("SQL Placeholder: INSERT INTO tratamientos ...", nuevo);

        setForm({
            nombreTratamiento: "",
            descripcion: "",
            duracionDias: "",
            horario: "",
            dias: [],
            dosis: "",
        });
    };

    const cancelarTratamiento = () => {
        setForm({
            nombreTratamiento: "",
            descripcion: "",
            duracionDias: "",
            horario: "",
            dias: [],
            dosis: "",
        });
    };

    const eliminarTratamiento = (id) => {
        const nuevosTratamientos = tratamientos.filter((t) => t.id !== id);
        setTratamientos(nuevosTratamientos);
        localStorage.setItem("tratamientos", JSON.stringify(nuevosTratamientos));

        // Placeholder para eliminar en DB
        console.log("SQL Placeholder: DELETE FROM tratamientos WHERE id =", id);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Gestión de Tratamientos</h2>

            <div className={styles.form}>
                <input
                    type="text"
                    name="nombreTratamiento"
                    placeholder="Nombre del tratamiento"
                    value={form.nombreTratamiento}
                    onChange={handleChange}
                    className={styles.input}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={3}
                    className={styles.textarea}
                />
                <input
                    type="number"
                    name="duracionDias"
                    placeholder="Duración en días"
                    value={form.duracionDias}
                    onChange={handleChange}
                    min={1}
                    className={styles.input}
                />
                <input
                    type="time"
                    name="horario"
                    value={form.horario}
                    onChange={handleChange}
                    className={styles.input}
                />

                <div>
                    <span style={{ fontWeight: "bold" }}>Días de la semana:</span>
                    <div className={styles.checkboxContainer}>
                        {diasSemana.map((dia) => (
                            <label key={dia} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value={dia}
                                    checked={form.dias.includes(dia)}
                                    onChange={handleChange}
                                /> {dia}
                            </label>
                        ))}
                    </div>
                </div>

                <input
                    type="text"
                    name="dosis"
                    placeholder="Dosis (ej: 1 al día)"
                    value={form.dosis}
                    onChange={handleChange}
                    className={styles.input}
                />

                <div className={styles.buttons}>
                    <button onClick={guardarTratamiento} className={`${styles.btn} ${styles.btnGuardar}`}>
                        Guardar
                    </button>
                    <button onClick={cancelarTratamiento} className={`${styles.btn} ${styles.btnCancelar}`}>
                        Cancelar
                    </button>
                </div>
            </div>

            <ul className={styles.lista}>
                {tratamientos.length === 0 && <li className={styles.noTratamientos}>No hay tratamientos añadidos</li>}
                {tratamientos.map((t) => (
                    <li key={t.id} className={styles.listaItem}>
                        <div className={styles.listaItemInfo}>
                            <strong>{t.nombreTratamiento}</strong> - {t.descripcion}<br />
                            Duración: {t.duracionDias} días | Horario: {t.horario} | Dosis: {t.dosis}<br />
                            Días: {t.dias.join(", ")}
                        </div>
                        <button
                            onClick={() => eliminarTratamiento(t.id)}
                            className={styles.btnEliminar}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
