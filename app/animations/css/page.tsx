'use client';

import styles from './page.module.css';

const sections = [
  {
    id: 'practice1',
    title: 'Overflow Practice',
    children: (
      <p>
        It is a long text for overflow test. It is a long text for overflow
        test. It is a long text for overflow test. It is a long text for
        overflow test. It is a long text for overflow test.
      </p>
    ),
  },
  {
    id: 'practice2',
    title: 'Unit Practice',
    children: <p>Unit Practice Text</p>,
  },
  {
    id: 'practice3',
    title: 'Size Practice',
    children: <div className={styles.innerBox}></div>,
  },
  {
    id: 'practice4',
    title: 'Position Practice',
    children: null,
  },
];

const Css = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={styles.container}>
        <div className={styles.stickyBox}></div>
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-section={section.id}
            className={styles.section}
          >
            <h1 className="text-2xl font-bold">{section.title}</h1>
            <div className={styles.boxWrapper}>
              {[...Array(5)].map((_, index) => (
                <div key={index} className={styles.box}>
                  {section.children}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};

export default Css;
