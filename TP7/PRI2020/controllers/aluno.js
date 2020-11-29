var Aluno = require('../models/aluno')

// Devolve a lista de alunos
module.exports.listar = () => {
    return Aluno
        .find()
        .exec()
}

module.exports.consultar = id => {
    return Aluno
        .findOne({
            _id: id
        })
        .exec()
}

module.exports.inserir = a => {
    var novo = new Aluno(a)
    return novo.save()
}

module.exports.eliminar = id => {
    return Aluno
        .deleteOne({
            _id: id
        })
}

module.exports.atualizar = (num, aluno) => {
    return Aluno
        .updateOne({
            _id: num
        }, aluno)
}
