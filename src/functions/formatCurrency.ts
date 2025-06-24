export function formatCurrency(amount: number): string {
  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return currency.format(amount);
}
