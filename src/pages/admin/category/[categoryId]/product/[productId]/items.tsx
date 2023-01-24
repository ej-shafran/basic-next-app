import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';

import db from 'db';
import { Item } from "@prisma/client";
import NewItemForm from "components/new-item-form";
import Link from "next/link";

interface PageProps {
  productId: number;
  categoryId: number;
  productName: string;
  items: Item[];
}

const ProductsPage: NextPage<PageProps> = (props) => {
  const { items, productId, productName, categoryId } = props;

  const router = useRouter();

  return (<div>
    <h1>Products for {productName}</h1>
    <section>
      <NewItemForm onSubmit={async values => {
        try {
          await axios.post("/api/store/item", values);
          router.push(router.asPath);
        } catch (error) {
          router.push("/error");
        }
      }} productId={productId} />
    </section>

    <section>
      <h2>Existing items:</h2>
      <ol>
        {items.map(({ id }) => (<li key={id}>
          <p>Item: ID ${id}</p>
          <button onClick={async () => {
            try {
              await axios.delete("/api/store/item", {
                params: { id }
              });
              router.push(router.asPath);
            } catch (error) {
              router.push("/error")
            }
          }}>Delete</button>
          <br />
        </li>))}
      </ol>
    </section>

    <section>
      <Link href={`/admin/category/${categoryId}/products`}>Back to products</Link>
    </section>
  </div>);
}

export default ProductsPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { params } = context;
  const rawId = params.productId && !Array.isArray(params.productId) ? params.productId : null;
  if (!rawId) return {
    notFound: true
  }

  const productId = parseFloat(rawId);

  const product = await db.product.findUnique({ where: { id: productId }, include: { items: true } })

  return {
    props: { productId, productName: product.name, items: product.items, categoryId: product.categoryId }
  }
}
