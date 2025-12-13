import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, we couldn't find the page you're looking for.</p>
        <div className={styles.actions}>
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              View Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
