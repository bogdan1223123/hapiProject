const fs = require("fs").promises;

const getFIleData = async (request, reply) => {
  try {
    const value = { isSuccess: true };
    value.result = JSON.parse(
      await fs.readFile("src/data/index.json", "utf-8")
    );

    return value;
  } catch (error) {
    console.error("Error: ", error);
    return { isSuccess: false, message: error.toString() };
  }
};

const writeFile = async (request, reply) => {
  try {
    const randomValue = Math.floor(Math.random() * 1_000_000);
    // Получение данных из файла
    const data = JSON.parse(await fs.readFile("src/data/index.json", "utf-8"));

    // Добавление нового элемента
    if (request.query?.text) {
      data.push({ id: randomValue, text: `${request.query?.text}` });
    } else {
      data.push({ id: randomValue, text: `something text ${randomValue}` });
    }
    // Запись в файл
    await fs.writeFile("src/data/index.json", JSON.stringify(data));

    return { isSuccess: true, message: `Файл обновлен` };
  } catch (error) {
    console.error("Custom Error: ", error);
    return { isSuccess: false, message: `Ошибка записи в файл: ${error}` };
  }
};

exports.getFIleData = getFIleData;
exports.writeFile = writeFile;
