function Footer({ todos }){
    let todoCount = todos.length;
    let completedCount = todos.filter(todo => todo.isDone).length;
    let percentCompleted = Math.round((completedCount / todoCount) * 100);

    return (
        <div>You have {todoCount} item in your list, {completedCount}, {percentCompleted}%</div>
    )
}
export default Footer;