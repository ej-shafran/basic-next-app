import { GetServerSideProps, NextPage } from "next";
import { Category } from "@prisma/client";
import axios from 'axios';

import db from 'db';
import { NewCategoryForm } from "components/new-category-form";
import { useRouter } from "next/router";
import Link from "next/link";

interface PageProps {
  categories: Category[];
}

const CategoriesPage: NextPage<PageProps> = (props: PageProps) => {
  const { categories } = props;

  const router = useRouter();

  return (<div>
    <section>
      <NewCategoryForm onSubmit={async values => {
        try {
          await axios.post("/api/store/category", values);
          router.push(router.asPath);
        } catch (error) {
          router.push("/error");
        }
      }} />
    </section>

    <section>
      <h2>Existing categories:</h2>
      <ol>
        {categories.map(({ id, name }) => (<li key={id}>
          <Link href={`/admin/category/${id}`}>{name}</Link>
        </li>))}
      </ol>
    </section>
  </div>)
}

export default CategoriesPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  const categories = await db.category.findMany();

  return {
    props: {
      categories,
    }
  }
}
