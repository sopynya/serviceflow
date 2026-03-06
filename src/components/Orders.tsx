import styles from './orders.module.css'
export default function Orders() {
    return(
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Service Orders</h1>

                <div>
                    <input type='search'/>
                    <button>Add Order +</button>
                </div>
            </header>

            <main>
                <table>
                    
                </table>
            </main>
        </div>
    )
}