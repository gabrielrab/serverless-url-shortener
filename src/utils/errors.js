module.exports = {
  NotFound: {
    status: 404,
    defaultMessage: 'Recurso não encontrado.',
  },
  UnexpectedException: {
    status: 500,
    defaultMessage: 'Erro inesperado.',
  },
  Forbidden: {
    status: 403,
    defaultMessage: 'Sem permissão para acessar este recurso.',
  },
  Request: {
    status: 400,
    defaultMessage: 'Falha na requisição.',
  },
  Unauthorized: {
    status: 401,
    defaultMessage: 'Necessário autenticação para acessar o recurso.',
  },
  Validation: {
    status: 422,
    defaultMessage: 'Erro de validação.',
  },
};
