import { ExpReward } from "src/types/types";

export class LogMsgBuilder {
  private msg: string;

  constructor() {
    this.msg = "";
  }

  finished = (playerName: string, action: string, amount: number, name: string): this => {
    this.msg = this.msg.concat(`<orange#${playerName}> finished ${action} <green#${amount} ${name}s>. `);
    return this;
  };

  /**
   ** They gained 50 slayer xp
   ** They gained 50 slayer and 90 cooking xp
   ** They gained 50 slayer, 90 cooking and 25 smithing xp
   * @param expReward \[{ skill: "construction", amount: 93 }]
   */

  gaining = (expReward: ExpReward[]): this => {
    const x = expReward
      .map(({ skill, amount }) => `<cyan#${amount}> ${skill}`)
      .join(", ")
      .replace(/(?:,)([^,]+)$/, " and$1");
    this.msg = this.msg.concat(`They gained ${x} xp.`);
    return this;
  };

  /**
   * returns a message string, end the chain with this
   */

  toString = (): string => this.msg;
}
