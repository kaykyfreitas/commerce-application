import Id from "../../../@shared/domain/value-object/id.value-object"
import Transaction from "../../domain/transaction"
import ProcessPaymentUseCase from "./process-payment.usecase"

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved"
})

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction))
  }
}

const declinedTransaction = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined"
})

const DeclinedMockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(declinedTransaction))
  }
}

describe("Process Payment usecase unit test", () => {

  it("should process payment", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 100
    }

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(transaction.id.value);
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(100);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(transaction.createdAt);
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt)
  })

  it("should decline payment", async () => {
    const paymentRepository = DeclinedMockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 50
    }

    const result = await usecase.execute(input);

    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe(declinedTransaction.id.value);
    expect(result.status).toBe("declined");
    expect(result.amount).toBe(50);
    expect(result.orderId).toBe("1");
    expect(result.createdAt).toStrictEqual(declinedTransaction.createdAt);
    expect(result.updatedAt).toStrictEqual(declinedTransaction.updatedAt)
  })

})