class MoneyFormatterService {
  private static _formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  public static Format(value: string) {
    return MoneyFormatterService._formatter.format(Number(value));
  }

}

export default MoneyFormatterService;
