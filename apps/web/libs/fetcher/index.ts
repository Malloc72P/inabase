export const fetcher = async (url: string, param: any) => {
  console.log(url, param);

  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.');
    (error as any).info = await response.json();
    (error as any).status = response.status;
    throw error;
  }

  return response.json();
};
