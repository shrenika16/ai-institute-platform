const axios = require("axios");

// =================================================

const generateAIResponse =
  async (req, res) => {

    try {

      const { prompt } =
        req.body;

      // =================================================
      // VALIDATION
      // =================================================

      if (!prompt) {

        return res.status(400).json({

          success: false,

          message:
            "Prompt is required",

        });

      }

      // =================================================
      // OPENROUTER API
      // =================================================

      const response =
        await axios.post(

          "https://openrouter.ai/api/v1/chat/completions",

          {

            model:
              "openai/gpt-3.5-turbo",

            messages: [

              {
                role: "user",

                content: prompt,
              },

            ],

          },

          {

            headers: {

              "Authorization":
                `Bearer ${process.env.OPENROUTER_API_KEY}`,

              "HTTP-Referer":
                "http://localhost:5173",

              "X-Title":
                "AI Institute Platform",

              "Content-Type":
                "application/json",

            },

          }
        );

      // =================================================

      const text =
        response.data
          .choices[0]
          .message.content;

      // =================================================

      res.status(200).json({

        success: true,

        response: text,

      });

    } catch (error) {

      console.log(
        "AI ERROR:",
        error.response?.data ||
        error.message
      );

      res.status(500).json({

        success: false,

        message:
          "AI Failed",

      });

    }

  };

// =================================================

module.exports = {
  generateAIResponse,
};