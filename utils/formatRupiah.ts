export default function formatRupiah(price: number | undefined): string {
  const validPrice = price ?? 0;

  if (isNaN(validPrice)) {
    return "Invalid price";
  }

  const formattedPrice = validPrice.toFixed(2);

  // eslint-disable-next-line prefer-const
  let [integer, decimal] = formattedPrice.split(".");

  if (!decimal) {
    decimal = "00";
  }

  const rupiah = `Rp. ${integer.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  )},${decimal}`;

  return rupiah;
}
