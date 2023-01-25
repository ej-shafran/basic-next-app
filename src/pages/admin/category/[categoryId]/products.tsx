import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';

import db from 'db';
import { Product } from "@prisma/client";
import NewProductForm from "components/new-product-form";
import Link from "next/link";

interface PageProps {
  categoryId: number;
  categoryName: string;
  products: Product[];
}

const ProductsPage: NextPage<PageProps> = (props) => {
  const { products, categoryId, categoryName } = props;

  const router = useRouter();

  return (<div>
    <h1>Products for {categoryName}</h1>
    <section>
      <NewProductForm onSubmit={async values => {
        try {
          await axios.post("/api/store/product", values);
          router.push(router.asPath);
        } catch (error) {
          router.push("/error");
        }
      }} categoryId={categoryId} />
    </section>

    <section>
      <h2>Existing products:</h2>
      <ol>
        {products.map(({ id, name }) => (<li key={id}>
          <p><Link href={`/admin/category/${categoryId}/product/${id}/items`}>{name}</Link></p>
          <button onClick={async () => {
            try {
              await axios.delete("/api/store/product", {
                params: { id }
              });
              router.push(router.asPath);
            } catch (error) {
              router.push("/error")
            }
          }}>Delete</button>
        </li>))}
      </ol>
    </section>

    <section>
      <Link href={`/admin/categories`}>Back to categories</Link>
    </section>
  </div>);
}

export default ProductsPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { params } = context;
  const rawId = params.categoryId && !Array.isArray(params.categoryId) ? params.categoryId : null;
  if (!rawId) return {
    notFound: true
  }

  const categoryId = parseInt(rawId);

  const category = await db.category.findUnique({ where: { id: categoryId }, include: { products: true } })

  return {
    props: { categoryId, categoryName: category.name, products: category.products }
  }
}
