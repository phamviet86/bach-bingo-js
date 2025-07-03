Your goal is to create well-structured prompt instruction files for code generation tasks.

Ask for the specific task type and requirements if not provided.

Requirements for prompt files:

- Follow the structure pattern established in existing prompts: [gen-jsdoc.prompt.md](./gen-jsdoc.prompt.md)
- Always include:
  - Clear goal statement at the beginning
  - Interactive element asking for missing information
  - Comprehensive requirements section with bullet points
  - Code examples or templates when applicable
  - Reference to existing files or documentation
- Structure guidelines:
  - Start with "Your goal is to [specific task description]"
  - Include "Ask for [missing info] if not provided"
  - Use "Requirements for [task type]:" as section header
  - Organize requirements in logical sub-sections
  - Provide concrete examples and templates
- Content standards:
  - Use Vietnamese for descriptions and comments in examples
  - Include both recommended and alternative approaches
  - Reference actual project files for consistency
  - Provide realistic, practical examples
  - Cover common edge cases and error scenarios

Template structure for new prompts:

````markdown
Your goal is to generate clear and concise instructions for a specific coding task.

Ask for [task details] if not provided.

Requirements for [instruction generation]:

- [Main requirement category]:
  - [Specific requirement 1]
  - [Specific requirement 2]
  - [Reference to documentation/examples]
- [Technical standards]:
  - [Coding convention 1]
  - [Coding convention 2]
  - [TypeScript/framework specific requirements]
- [Quality standards]:
  - [Documentation requirements]
  - [Testing requirements]
  - [Error handling requirements]

Sample [output type] structure:

```[language]
// Example code or template
```
````

```

Best practices:
- Keep prompts focused on a single task type
- Include references to actual project files
- Use consistent naming conventions following project standards
- Provide multiple examples for different scenarios
- Include Vietnamese comments for better local context
```
