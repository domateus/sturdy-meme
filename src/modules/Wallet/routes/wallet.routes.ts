import WalletController from "@Wallet/controllers/WalletController";
import { Router } from "express";

const walletRouter = Router();
const walletController = new WalletController();

walletRouter.get("/", walletController.findAllWallets);
walletRouter.get("/:id", walletController.findWalletById);
walletRouter.post("/", walletController.createWallet);
walletRouter.delete("/:id", walletController.deleteWallet);

export default walletRouter;
