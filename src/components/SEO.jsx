import Head from 'next/head';

export default function SEO({ title, description, keywords }) {
  return (
    <Head>
      <title>{title} | GrantHub</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta property="og:title" content={`${title} | GrantHub`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GrantHub" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${title} | GrantHub`} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}