;("use strict")
import LottoModel from "./models/lotto_model.js"
import LottoView from "./views/lotto_view.js"
import LottoController from "./controllers/lotto_controller.js"

const lottoController = new LottoController(new LottoModel(), new LottoView())
lottoController.init()
