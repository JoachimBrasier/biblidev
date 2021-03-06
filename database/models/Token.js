const { Schema, model } = require('mongoose');

const TokenSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['emailValidation', 'passwordReset'],
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Ajoute un index sur expireAt pour automatiquement supprimer un document après un temps donné
TokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const Token = model('tokens', TokenSchema);
module.exports = Token;
