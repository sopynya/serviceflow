import styles from './addClient.module.css'
import { useState } from 'react';
type ModalProps = {
  onClose: () => void;
};
export default function({onClose}: ModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    async function saveClient(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/clients', {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({name, email})
            });
            const data = await res.json();
            if(!res.ok) {
                setError(data.error);
                throw new Error(data.error);
            }


        } catch (err) {
            console.log(err)

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unexpected error");
            }
        }
         finally {
            setLoading(false);
        }
    }
    return(
        <div className={styles.bg}>
            <div className={styles.modal}>
                <p className={styles.close} onClick={onClose}>X</p>
                <h2>Add new client</h2>
                <p>Please enter the enter the client's information</p>

                <form onSubmit={saveClient}>
                    <label>Name</label>
                    <input type='text' onChange={(e) => setName(e.target.value)} required/>
                    <label>Email</label>
                    <input type='email' onChange={(e) => setEmail(e.target.value)} />

                    <button type='submit'>Submit</button>
                </form>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    )
}