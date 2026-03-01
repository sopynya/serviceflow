import styles from './landing.module.css'
import Link from 'next/link';
export default function Landing() {
    return (
        <div>
        <header className={styles.header}>
            <h1 className={styles.title}><img src='/logo.png' />ServiceFlow</h1>

            <nav className={styles.nav}>
                <a href='#features'>Features</a>
                <a href='#benefits'>Benefits</a>
            </nav>
        </header>

        <main className={styles.main}>
            <section className={styles.hero}>
                <p className={styles.whatis}>PROFESSIONAL SERVICE MANAGEMENT</p>
                <h2>Streamline Your <span>Service Operations</span></h2>
                <p className={styles.description}>
                    The all-in-one platform for technical assistance, 
                    maintenance shops, and service providers to manage clients, 
                    technicians, and work orders with precision.
                </p>
                <Link className={styles.getStarted} href='/signup'>Get Started<img src='/arrow-right.svg'/></Link>
                <img src='/undraw.svg' className={styles.heroImg}/>
            </section>

            <section id='benefits' className={styles.benefits}>
                <h2>Why Choose ServiceFlow?</h2>
                <p className={styles.benefitsIntro}>
                    Built for efficiency, designed for growth. 
                    We help you focus on the service while we handle the management.
                </p>

                <div className={styles.benefitsGrid}>
                    <div className={styles.benefitCard}>
                        <img src='/lightning.svg'/>
                        <h3>Increased Productivity</h3>
                        <p>
                            Reduce administrative overhead by 40% with automated 
                            workflows and centralized data management.
                        </p>
                    </div>
                    <div className={styles.benefitCard}>
                        <img src='/shield-check.svg'/>
                        <h3>Reliable Tracking</h3>
                        <p>
                            Never lose track of a service order again. 
                            Real-time status updates keep your team and clients informed.
                        </p>
                    </div>
                    <div className={styles.benefitCard}>
                        <img src='/chart.svg'/>
                        <h3>Data-Driven Insights</h3>
                        <p>
                            Understand your business performance with 
                            detailed analytics on technician efficiency and service volume.
                        </p>
                    </div>
                </div>
            </section>

            <section id='features' className={styles.features}>
                <div className={styles.featuresList}>
                    <h2>Everything you need to run a <span>successful service business</span></h2>

                    <div className={styles.feature}>                    
                        <img src='/check-circle.svg'/>
                        <div>
                            <h3>Smart Order Management</h3>
                            <p>
                                Create, assign, and track service orders with 
                                custom priorities and detailed descriptions.
                            </p>
                        </div>
                    </div>

                    <div className={styles.feature}>                    
                        <img src='/check-circle.svg'/>
                        <div>
                            <h3>Client CRM</h3>
                            <p>
                                Maintain a complete history of services for every 
                                client. <br/>Build trust through organized records.
                            </p>
                        </div>
                    </div>

                    <div className={styles.feature}>                    
                        <img src='/check-circle.svg'/>
                        <div>
                            <h3>Technician Dispatch</h3>
                            <p>
                                Optimize your workforce by assigning the right 
                                technician to the right job based on specialty.
                            </p>
                        </div>
                    </div>

                    <div className={styles.feature}>                    
                        <img src='/check-circle.svg'/>
                        <div>
                            <h3>Status Monitoring</h3>
                            <p>
                                Real-time visibility into your business operations. <br/>
                                Know exactly what's pending, in progress, or done.
                            </p>
                        </div>
                    </div>
                </div>

                <img className={styles.featuresImg} src='/onlinestats.svg' />
            </section>
        </main>
        </div>
    );
}