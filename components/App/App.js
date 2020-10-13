import { useQuery } from '@apollo/client'
import React from 'react'
import styles from './App.module.css'
import APP_QUERY from './App.graphql'
import Link from 'next/link'
import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'
import { resolveImage } from '~/lib/resolve-image'

export const App = ({ children }) => {
  const { data } = useQuery(APP_QUERY)

  const store = data?.storeConfig

  const categories = data?.categoryList[0].children

  return (
    <React.Fragment>
      <Head>
        <title>{store?.default_title}</title>
      </Head>

      <div className={styles.app}>
        <NextNprogress
          startPosition={0.4}
          stopDelayMs={200}
          height={6}
          options={{ showSpinner: false, easing: 'ease' }}
        />

        <header className={styles.header}>
          <Link href="/">
            <a>
              <img
                src={
                  store?.header_logo_src
                    ? resolveImage(
                        store.base_media_url + 'logo/' + store.header_logo_src
                      )
                    : '/static/logo.png'
                }
                alt={store?.logo_alt ?? 'Store'}
              />
            </a>
          </Link>

          <nav className={styles.categoriesWrapper}>
            <ul className={styles.categories}>
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.url_key}`}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {children}

        {store?.copyright && (
          <footer className={styles.footer}>
            {data.storeConfig.copyright}
          </footer>
        )}
      </div>
    </React.Fragment>
  )
}
