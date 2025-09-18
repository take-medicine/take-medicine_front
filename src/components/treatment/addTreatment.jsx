import { useState, useEffect } from "react";
import styles from "./addTreatment.module.css";

export default function TreatmentMenu() {
    const [Treatment, setTreatmentToday] = useState([]);
    const [form, setForm] = useState({
        NameTreatment: "",
        description: "",
        durationDays: "",
        schedule: "",
        days: [],
        dose: "",
    });

    const week = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    useEffect(() => {
        const saved = localStorage.getItem("tratamientos");
        if (saved) setTreatmentToday(JSON.parse(saved));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            let NewDays = [...form.days];
            if (checked) NewDays.push(value);
            else NewDays = NewDays.filter((d) => d !== value);
            setForm({ ...form, days: NewDays });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const saveTreatments = () => {
        if (form.NameTreatment.trim() === "" || form.durationDays === "" || form.days.length === 0) {
            alert("Nombre, duración y al menos un día son obligatorios.");
            return;
        }

        const nuevo = { id: Date.now(), ...form };
        const nuevosTratamientos = [...Treatment, nuevo];
        setTreatmentToday(nuevosTratamientos);
        localStorage.setItem("treatmentsDB", JSON.stringify(nuevosTratamientos));

        // Placeholder para guardar en DB
        console.log("SQL Placeholder: INSERT INTO tratamientos ...", nuevo);

        setForm({
            NameTreatment: "",
            description: "",
            durationDays: "",
            schedule: "",
            days: [],
            dose: "",
        });
    };

    const cancelTreatment = () => {
        setForm({
            NameTreatment: "",
            description: "",
            durationDays: "",
            schedule: "",
            days: [],
            dose: "",
        });
    };

    const removeTreatment = (id) => {
        const newTreatments = Treatment.filter((t) => t.id !== id);
        setTreatmentToday(newTreatments);
        localStorage.setItem("treatmentsDB", JSON.stringify(newTreatments));

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
                    value={form.NameTreatment}
                    onChange={handleChange}
                    className={styles.input}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={handleChange}
                    rows={3}
                    className={styles.textarea}
                />
                <input
                    type="number"
                    name="duracionDias"
                    placeholder="Duración en días"
                    value={form.durationDays}
                    onChange={handleChange}
                    min={1}
                    className={styles.input}
                />
                <input
                    type="time"
                    name="horario"
                    value={form.schedule}
                    onChange={handleChange}
                    className={styles.input}
                />

                <div>
                    <span style={{ fontWeight: "bold" }}>Días de la semana:</span>
                    <div className={styles.checkboxContainer}>
                        {week.map((dia) => (
                            <label key={dia} className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    name="dias"
                                    value={dia}
                                    checked={form.days.includes(dia)}
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
                    value={form.dose}
                    onChange={handleChange}
                    className={styles.input}
                />

                <div className={styles.buttons}>
                    <button onClick={saveTreatments} className={`${styles.btn} ${styles.btnGuardar}`}>
                        Guardar
                    </button>
                    <button onClick={cancelTreatment} className={`${styles.btn} ${styles.btnCancelar}`}>
                        Cancelar
                    </button>
                </div>
            </div>

            <ul className={styles.lista}>
                {Treatment.length === 0 && <li className={styles.noTratamientos}>No hay tratamientos añadidos</li>}
                {Treatment.map((t) => (
                    <li key={t.id} className={styles.listaItem}>
                        <div className={styles.listaItemInfo}>
                            <strong>{t.nombreTratamiento}</strong> - {t.descripcion}<br />
                            Duración: {t.duracionDias} días | Horario: {t.horario} | Dosis: {t.dosis}<br />
                            Días: {t.dias.join(", ")}
                        </div>
                        <button
                            onClick={() => removeTreatment(t.id)}
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
