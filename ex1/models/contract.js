const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  NomeInstituicao: { type: String },
  NIPCInstituicao: { type: Number },
  NomeTitularContrato: { type: String },
  CienciaID: { type: String },
  ORCID: { type: String },
  CienciaVitae: { type: String },
  Carreira_RPN: { type: String },
  Categoria_RPN: { type: String },
  Vinculo_RPN: { type: String },
  RegimePrestacaoServico: { type: String },
  DataInicioContrato: { type: Date },
  DataFimContrato: { type: Date },
  ETIremunerado: { type: Number },
  ProcedimentoVinculacao: { type: String },
  AreasInvestigacao: { type: String },
  NivelFormacao: { type: String },
  InstituicaoEnsino: { type: String },
  PaisInstituicao: { type: String },
  AnoDiploma: { type: Number },
  Curso: { type: String },
  AreaCNAEF: { type: String },
  AreaFORD: { type: String },
  ProvasAgregacao: { type: Number },
  TituloEspecialista: { type: Number },
  ProvasCoordenacao: { type: Number },
  ProvasAptidao: { type: Number }
});


module.exports = mongoose.model('Contract', contractSchema);

