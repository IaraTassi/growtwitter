import type { RegisterTextContentProps } from "../types";

export function RegisterTextContent({
  onSwitchMode,
}: RegisterTextContentProps) {
  return (
    <section>
      <header>
        <h2>Growtwitter</h2>
        <p>
          <small>Trabalho final do bloco intermediário.</small>
        </p>
      </header>

      <p>
        Crie sua conta e faça parte do Growtwitter, uma rede social pensada para
        quem valoriza conexão, troca de ideias e liberdade de expressão. Aqui
        você pode compartilhar opiniões, acompanhar pessoas do mundo todo e
        participar de conversas que realmente importam.
      </p>

      <button onClick={onSwitchMode}>
        Já tem conta? <strong>Entrar</strong>
      </button>
    </section>
  );
}
