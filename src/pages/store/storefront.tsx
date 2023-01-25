import { useState } from 'react';
import { Category, Item, Product } from '@prisma/client';
import { GetServerSideProps, NextPage } from "next";

import db from 'db';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface PageProps {
  categories: (Category & {
    products: (Product & {
      items: Item[]
    })[]
  })[]
}

const StorefrontPage: NextPage<PageProps> = (props) => {
  const { categories } = props;

  const { data: session } = useSession();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<number>(-1);

  if (!session) {
    router.push("/");
    return <></>
  }

  return (<div>
    <header>
      <h1>COOL STORE</h1>
      <h2>Welcome, {session.user.name ?? "dear friend"}</h2>
      <label htmlFor="category">Filter by category:</label>
      <select id="category" value={selectedCategory} onChange={(e) => {
        setSelectedCategory(parseInt(e.target.value));
      }}>
        <option value={-1}>All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={(category.id)}>{category.name}</option>
        ))}
      </select>
    </header>

    <main>
      {categories.filterAndMap((category) => {
        if (selectedCategory === -1 || selectedCategory === category.id) return (
          <div key={"category-" + category.id}>
            {category.products.map((product) => (<div key={"product-" + product.id}>
              <p><b>{product.name}</b></p>
              <img src={`https://unsplash.it/id/${category.id}${product.id}/75/75`} alt="" />
              <p>Costs: ${product.cost}</p>
              <p>Available in:</p>
              {product.items.map((item) => (<div key={"item-" + item.id}>
                <p>{item.color}: <em>{item.amount} left!</em></p>
              </div>))}
              <p><em>Sold by {product.brand}</em></p>
            </div>))}
          </div>
        )
      })}
    </main>
  </div>)
}

export default StorefrontPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const categories = await db.category.findMany({
    include: {
      products: {
        include: {
          items: true,
        }
      }
    }
  })

  return {
    props: {
      categories
    }
  }
}
